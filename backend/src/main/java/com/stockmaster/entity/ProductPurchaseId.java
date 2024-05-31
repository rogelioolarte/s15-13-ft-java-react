package com.stockmaster.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;


@Data
@ToString
@Embeddable
public class ProductPurchaseId implements Serializable {

    private Long productId;
    private Long purchaseId;

    public void setProductId(long id){
        this.productId = id;
    }
    public void setProductId(String id){
        this.productId = Long.parseLong(id);
    }

    public void setPurchaseId(long id){
        this.purchaseId = id;
    }
    public void setPurchaseId(String id){
        this.purchaseId = Long.parseLong(id);
    }
}
