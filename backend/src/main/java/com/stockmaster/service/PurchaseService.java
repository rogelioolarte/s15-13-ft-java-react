package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.*;
import com.stockmaster.repository.ProductPurchaseRepository;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private SupplierRepository  supplierRepository ;

    @Transactional
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {

        List<PurchaseProduct> products = dtoPurchaseResponse.productList().stream().map(PurchaseProduct::new).toList();

        BigDecimal suma = new BigDecimal(0 );
               // products.stream().map(p ->suma.add(p.getProduct().getSalePrice()) );

                Supplier supplier = supplierRepository.findById(dtoPurchaseResponse.supplier()).orElseThrow(()-> new EntityNotFoundException("no existe el supplier"));

        Purchase purchase = Purchase.builder()
                .supplier(supplier)
                .date(dtoPurchaseResponse.date())
                .bill(dtoPurchaseResponse.bill())
                .productsPurchased(products)
                .total(suma)
                .build();
        return purchaseRepository.save(purchase);
    }

}


