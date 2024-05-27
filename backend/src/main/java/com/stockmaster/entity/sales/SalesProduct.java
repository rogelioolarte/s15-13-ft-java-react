package com.stockmaster.entity.sales;

import com.stockmaster.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "id_sales", nullable = false)
    private Sales sales;

    @ManyToMany
    @JoinTable(
            name = "sales_product_mapping",
            joinColumns = @JoinColumn(name = "id_sales_product"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<Product> products;

    @Column(nullable = false)
    private Integer quantity;

}