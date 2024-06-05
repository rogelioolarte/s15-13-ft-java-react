package com.stockmaster.entity;


import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import com.stockmaster.entity.sales.SalesProduct;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "product")
@AllArgsConstructor
@Data
@ToString
@Builder
//@IdClass(PurchaseProductId.class)
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

    @OneToMany(mappedBy = "product")
    private List<PurchaseProduct> purchase;


    @ManyToMany(mappedBy = "products")
    private List<Purchase> purchases;

 /*   @ManyToMany(mappedBy="products")
    private List<Purchase> purchase;

    @OneToMany(mappedBy="product")
    private List<PurchaseProduct> PurchaseProduct;*/

    public Product() {
        this.active = true;
    }
    public Product(DtoPurchaseProductResponse dtoPurchaseProductResponse) {

        this.id = dtoPurchaseProductResponse.id();
    }


}