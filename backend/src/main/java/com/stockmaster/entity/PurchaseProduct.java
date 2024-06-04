package com.stockmaster.entity;

import com.stockmaster.dto.Purchase.DtoPurchaseProductResponse;
import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="products_purchase")
public class PurchaseProduct {
    @EmbeddedId
   private PurchaseProductId id;

 /* @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;*/


    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "product_id")
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
    @MapsId("purchaseId")
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchase purchase;

    private int quantity;

    public PurchaseProduct(DtoPurchaseProductResponse dtoPurchaseResponse){
        this.product = Product.builder().id(dtoPurchaseResponse.id()).build();
        this.quantity = dtoPurchaseResponse.quantity();
    }


}