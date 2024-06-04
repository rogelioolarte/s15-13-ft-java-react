package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.dto.Purchase.DtoResponseRequest;
import com.stockmaster.entity.*;
import com.stockmaster.repository.ProductRepository;
import com.stockmaster.repository.PurchaseProductRepository;
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
    private PurchaseProductRepository purchaseProductRepository;

    @Autowired
    private ProductService productRepository;

    @Transactional
    public DtoResponseRequest MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {
        List<Product> products = dtoPurchaseResponse.productList().stream().map(Product::new).toList();

        Integer suma = 0;
        List<Product> productsDb = new ArrayList<>();
        for( Product p : products){
            var producto = productRepository.getProductById(p.getId());
          BigDecimal precio = producto.getSalePrice();
           suma += Integer.parseInt(String.valueOf(precio.intValue()));
            productsDb.add(producto) ;
        }





        List<PurchaseProduct> purchaseProductsroducts =dtoPurchaseResponse.productList().stream().map(PurchaseProduct::new).toList();




        Supplier supplier = supplierRepository.findById(dtoPurchaseResponse.supplier()).orElseThrow(() -> new EntityNotFoundException("no existe el supplier"));

        Purchase purchase = Purchase.builder()
                .supplier(supplier)
                .date(dtoPurchaseResponse.date())
                .bill(dtoPurchaseResponse.bill())
                // .productsPurchased(purchaseProductsroducts)
                .total(new BigDecimal(suma))
                .build();
        Purchase purchaseDb = purchaseRepository.save(purchase);

        purchaseProductsroducts.forEach(p-> p.setPurchase(purchaseDb));
       List<PurchaseProduct> productsDb2 = purchaseProductRepository.saveAll(purchaseProductsroducts);
         //purchaseDb.setPurchaseProduct(productsDb2);
        purchaseDb.setProducts(productsDb);
         return  new DtoResponseRequest(purchase.getPurchaseId(),purchase.getBill(),purchase.getDate(),supplier,products);
    }

}


