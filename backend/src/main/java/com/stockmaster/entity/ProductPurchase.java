package com.stockmaster.entity;

import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import com.stockmaster.entity.sales.Sales;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products_purchase")
public class ProductPurchase {


    @ManyToOne
   // @MapsId("productId")
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
   // @MapsId("purchaseId")
    @JoinColumn(name = "id_purchase")
    private Purchase purchase;

    private Integer quantity;

    @ManyToMany
    @JoinTable(
            name = "sales_product_mapping",
            joinColumns = @JoinColumn(name = "id_sales_product"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<Purchase> purchase;

    public ProductPurchase(DtoPurchaseProductResponse dtoPurchaseProductResponse) {
        this.quantity = dtoPurchaseProductResponse.quantity();
        this.product = Product.builder().id(dtoPurchaseProductResponse.id()).build();
    }
}