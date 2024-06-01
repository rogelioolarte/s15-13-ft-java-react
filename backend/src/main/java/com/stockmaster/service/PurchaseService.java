package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.*;
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


return new Purchase();
    }

}


