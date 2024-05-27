package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "supplier_product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "products")
    private List<Supplier> suppliers;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "price_cost", nullable = false)
    private double priceCost;
}