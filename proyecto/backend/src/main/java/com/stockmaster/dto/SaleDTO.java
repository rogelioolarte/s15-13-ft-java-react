package com.stockmaster.dto;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SaleDTO {

    private Long idCustomer;
    private Long idTaxes;
    private Date date;
    private BigDecimal discount;
    private BigDecimal total;
    private List<SalesProductDTO> products;

    // Getters and setters

    public Long getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Long idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Long getIdTaxes() {
        return idTaxes;
    }

    public void setIdTaxes(Long idTaxes) {
        this.idTaxes = idTaxes;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<SalesProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<SalesProductDTO> products) {
        this.products = products;
    }
}