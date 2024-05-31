package com.stockmaster.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;


@Data
@Embeddable
public class ProductPurchaseId implements Serializable {

    private Long productId;
    private Long purchaseId;
}
