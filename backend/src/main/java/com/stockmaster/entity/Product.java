package com.stockmaster.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String barcode;
    private String description;
    private BigDecimal salePrice;
    private int minimal;
    private int stock;
    private boolean active;

    // Getters y Setters
}