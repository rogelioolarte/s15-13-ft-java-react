package com.stockmaster.dto.Purchase;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.PurchaseProduct;

import java.math.BigDecimal;

public record ProductDtoResponsePUrchase(String name,BigDecimal salePrice, Integer quantity) {

    public ProductDtoResponsePUrchase(PurchaseProduct products ){
        this(products.getProduct().getName(),products.getProduct().getSalePrice(),products.getQuantity());
    }



}
