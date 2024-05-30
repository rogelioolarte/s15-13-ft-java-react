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
import java.util.Set;

@Entity
@Table(name= "sales")
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
    /*
    @ManyToMany
    @JoinTable(
            name = "sales_taxes",
            joinColumns = @JoinColumn(name = "sales_id"),
            inverseJoinColumns = @JoinColumn(name = "tax_id")
    )
    private Set<Taxes> taxes;*/

    @ManyToOne
    @JoinColumn(name = "id_taxes", nullable = false)
    private Taxes tax;

    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date = new Date();

    @Column(name = "total")
    private BigDecimal total;

    @ManyToMany
    @JoinTable(
            name = "sales_products",
            joinColumns = @JoinColumn(name = "id_sales"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<SalesProduct> products;
}