package com.stockmaster.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long idCustomer;

    @Column(nullable = false)
    private Long idTaxes;

    @Temporal(TemporalType.DATE)
    private Date date = new Date();

    @Column(nullable = true)
    private BigDecimal discount;

    @Column(nullable = false)
    private BigDecimal total;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SalesProduct> products;

    public Sale() {
    }

    public Sale(Long id, Long idCustomer, Long idTaxes, Date date, BigDecimal discount, BigDecimal total, List<SalesProduct> products) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.idTaxes = idTaxes;
        this.date = date;
        this.discount = discount;
        this.total = total;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public List<SalesProduct> getProducts() {
        return products;
    }

    public void setProducts(List<SalesProduct> products) {
        this.products = products;
    }
}