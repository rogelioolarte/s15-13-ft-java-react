package com.stockmaster.entity;

import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products_purchase")
public class ProductPurchase {

    @EmbeddedId
    private ProductPurchaseId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @MapsId("purchaseId")
    @JoinColumn(name = "id_purchase")
    private Purchase purchase;

    private Integer quantity;


    public ProductPurchase(DtoPurchaseProductResponse dtoPurchaseProductResponse) {
        this.quantity = dtoPurchaseProductResponse.quantity();
        this.product = Product.builder().id(dtoPurchaseProductResponse.id()).build();
    }
}