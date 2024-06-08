package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.dto.Purchase.DtoResponseRequest;
import com.stockmaster.dto.Purchase.ProductDtoResponsePUrchase;
import com.stockmaster.dto.Purchase.dtoSupplierPurchase;
import com.stockmaster.entity.*;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductService productService;

    @Transactional
    public DtoResponseRequest MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {
        List<Product> productsMaper = dtoPurchaseResponse.productList().stream().map(Product::new).toList();
        List<PurchaseProduct> products = dtoPurchaseResponse.productList().stream().map(PurchaseProduct::new).toList();
        List<PurchaseProduct> productsDb = new ArrayList<>();
        Integer suma = 0;

        for(PurchaseProduct p : products ){
            Product pDb = productService.getProductById(p.getProduct().getId());
            suma += pDb.getSalePrice().intValue();
            productsDb.add( PurchaseProduct.builder().product(pDb).quantity(p.getQuantity()).build());
            pDb.setStock(pDb.getStock()+p.getQuantity());
            productService.updateProduct(pDb);
        }


        Supplier supplier = supplierRepository.findById(dtoPurchaseResponse.supplier()).orElseThrow(() -> new EntityNotFoundException("no existe el supplier"));

        Purchase purchase = Purchase.builder()
                .supplier(supplier)
                .date(dtoPurchaseResponse.date())
                .bill(dtoPurchaseResponse.bill())
                .products2(productsDb)
                .total(new BigDecimal(suma))
                .build();
        Purchase purchaseDb = purchaseRepository.save(purchase);
        List<ProductDtoResponsePUrchase> productResponse = productsDb.stream().map(ProductDtoResponsePUrchase::new).toList();
        return new DtoResponseRequest(purchaseDb.getPurchaseId(),purchaseDb.getBill(),purchaseDb.getDate(), new dtoSupplierPurchase(supplier),productResponse,purchaseDb.getTotal());
    }

    public List<DtoResponseRequest> getAllPurchases() {
      List<Purchase> productos =  purchaseRepository.findAll();
        List<DtoResponseRequest> dtoResponseRequest = productos.stream().map(DtoResponseRequest::new).toList();
        return dtoResponseRequest;
    }
}


