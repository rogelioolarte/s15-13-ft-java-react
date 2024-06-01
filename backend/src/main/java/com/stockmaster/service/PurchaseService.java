package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.ProductPurchase;
import com.stockmaster.entity.Purchase;
import com.stockmaster.entity.Supplier;
import com.stockmaster.repository.ProductPurchaseRepository;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private ProductPurchaseRepository productPurchaseRepository;

    @Autowired
    private ProductService productService;
    //getSupplierById
    @Autowired
    private SupplierRepository supplierService;
    @Transactional
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {

        Set<Product> products = dtoPurchaseResponse.productList().stream().map(Product::new).collect(Collectors.toSet());


        //productPurchase.forEach((f) ->  productPurchaseRepository.save(f));

var suplierdb = supplierService.getReferenceById(dtoPurchaseResponse.supplier());
       // Set<Product> products = productPurchase.//.stream().map(Product::new).collect(Collectors.toSet());

        Purchase purchase = Purchase.builder()
                .bill(dtoPurchaseResponse.bill())
                .product(products)
                .date(dtoPurchaseResponse.date())
                .idSupplier(suplierdb)
                .build();

        var purchaseDb = purchaseRepository.save(purchase);

       /* for (ProductPurchase p : productPurchase) {
            Product product = productService.getProductById(p.getProduct().getId());
            //p.setProduct(Product.builder().id(p.getProduct().getId()).build());
            p.setProduct(product);
            p.setPurchase(purchaseDb);
            productPurchaseRepository.save(p);
        }*/

        return purchaseDb;
    }

}


