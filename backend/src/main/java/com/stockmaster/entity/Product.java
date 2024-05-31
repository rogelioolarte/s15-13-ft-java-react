package com.stockmaster.entity;


import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

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

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "barcode", nullable = false)
    private String barcode;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "sale_price", nullable = false)
    private BigDecimal salePrice;

    @Column(name = "minimal", nullable = false)
    private int minimal;

    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "active", nullable = false)
    private boolean active;

    @ManyToMany(mappedBy = "product")
    private List<Purchase> purchase;


}