package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="products_purchase")
public class PurchaseProduct {
    @EmbeddedId
    private PurchaseProductId id;



    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @MapsId("purchaseId")
    @JoinColumn(name = "id_purchase")
    private Purchase purchase;

    private int quantity;

}