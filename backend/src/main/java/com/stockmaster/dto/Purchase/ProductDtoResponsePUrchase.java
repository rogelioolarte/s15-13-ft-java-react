package com.stockmaster.dto.Purchase;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.PurchaseProduct;
import com.stockmaster.entity.sales.SalesProduct;

import java.math.BigDecimal;

public record ProductDtoResponsePUrchase(String name,BigDecimal salePrice, Integer quantity) {

    public ProductDtoResponsePUrchase(PurchaseProduct products ){
        this(products.getProduct().getName(),products.getProduct().getSalePrice(),products.getQuantity());
    }




    public ProductDtoResponsePUrchase(SalesProduct salesProduct) {
        this(salesProduct.getProduct().getName(),salesProduct.getProduct().getSalePrice(),salesProduct.getQuantity());
    }


}
