package com.stockmaster.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String barcode;
    private String description;
    private BigDecimal salePrice;
    private int minimal;
    private int stock;
    private boolean active;


}