package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.*;
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

    @Transactional
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {

        List<PurchaseProduct> products = dtoPurchaseResponse.productList().stream().map(PurchaseProduct::new).toList();

        BigDecimal suma = new BigDecimal(0);
        products.stream().map(p -> suma.add(p.getProduct().getSalePrice()));

        Supplier supplier = supplierRepository.findById(dtoPurchaseResponse.supplier()).orElseThrow(() -> new EntityNotFoundException("no existe el supplier"));

        Purchase purchase = Purchase.builder()
                .supplier(supplier)
                .date(dtoPurchaseResponse.date())
                .bill(dtoPurchaseResponse.bill())
                .productsPurchased(products)
                .total(suma)
                .build();
        Purchase purchaseDb = purchaseRepository.save(purchase);
        for (PurchaseProduct purchaseProduct : products) {
            purchaseProduct.setPurchase(purchaseDb);
            purchaseProductRepository.save(purchaseProduct);
        }
        // List<PurchaseProduct>  productsPurchaseDb =  products.stream().map(p -> p.setPurchase(purchaseDb));
        // purchaseProductRepository.saveAll(productsPurchaseDb);
        purchaseRepository.save(purchaseDb);
        return purchaseDb;
    }

}


