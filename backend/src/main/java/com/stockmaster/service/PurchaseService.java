package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
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
    private ProductService productService;

    @Transactional
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {

        List<PurchaseProduct> products = dtoPurchaseResponse.productList().stream().map(PurchaseProduct::new).toList();
        List<PurchaseProduct> productsDb = new ArrayList<>();
        Integer suma = 0;

        for(PurchaseProduct p : products ){
            Product pDb = productService.getProductById(p.getProduct().getId());
            suma += pDb.getSalePrice().intValue();

            productsDb.add( PurchaseProduct.builder().product(pDb).quantity(p.getQuantity()).build());
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

        return purchaseDb;
    }

}


