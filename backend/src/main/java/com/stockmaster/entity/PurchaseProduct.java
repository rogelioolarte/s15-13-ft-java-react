package com.stockmaster.entity;

import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products_purchase")
public class PurchaseProduct {

    // @EmbeddedId
    //private PurchaseProductId id;

    /* @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    //@MapsId("id")
    @JoinColumn(name = "id_product", referencedColumnName = "id")
    private Product product;

  /*
    @ManyToMany
    @JoinTable(
            name = "products_purchase_mapping",
            joinColumns = @JoinColumn(name = "id_purchase_product"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<Product> products;*/

    @ManyToOne
    // @MapsId("purchaseId")
    @JoinColumn(name = "id_purchase", referencedColumnName = "id")
    private Purchase purchase;

    @Column(name = "quantity")
    private int quantity;

    public PurchaseProduct(DtoPurchaseProductResponse dtoPurchaseResponse) {
        this.product = Product.builder().id(dtoPurchaseResponse.id()).build();
        this.quantity = dtoPurchaseResponse.quantity();
    }

    public PurchaseProduct(Product product) {
        this.product = product;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = Purchase.builder().purchaseId(purchase.getPurchaseId()).build();
    }
}