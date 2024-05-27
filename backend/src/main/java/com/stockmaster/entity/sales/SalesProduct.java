package com.stockmaster.entity.sales;

import com.stockmaster.entity.Products;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sales_products")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SalesProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinColumn(name = "id_sales", nullable = false)
    private Sales sales;

    @ManyToMany
    @JoinColumn(name = "id_product", nullable = false)
    private Products products;

    @Column(nullable = false)
    private Integer quantity;
}