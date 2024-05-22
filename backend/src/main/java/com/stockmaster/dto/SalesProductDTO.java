package com.stockmaster.dto;

public class SalesProductDTO {

    private Long idProduct;
    private Integer quantity;

    // Getters and setters

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}