package com.stockmaster.entity;

import com.stockmaster.entity.Supplier;
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

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "price_cost", nullable = false)
    private double priceCost;
}