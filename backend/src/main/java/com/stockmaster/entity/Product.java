package com.stockmaster.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
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