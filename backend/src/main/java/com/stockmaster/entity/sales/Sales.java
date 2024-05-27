package com.stockmaster.entity.sales;

import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.customer.Customer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name= "sale")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_customer", nullable = false, referencedColumnName = "id")
    private Customer customer;

    @ManyToMany
    @JoinColumn(name = "id_taxes", nullable = false, referencedColumnName = "id")
    private Taxes taxes;

    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date = new Date();

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "total")
    private BigDecimal total;

    @ManyToMany(mappedBy = "sale")
    private List<SalesProduct> products;
}