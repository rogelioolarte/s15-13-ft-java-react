package com.stockmaster.entity.sales;

import com.stockmaster.entity.Product;
import com.stockmaster.entity.PurchaseProduct;
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
import org.hibernate.annotations.Fetch;

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

    @ManyToOne
    @JoinColumn(name = "id_taxes", nullable = false)
    private Taxes tax;

    @OneToMany(mappedBy = "sales", cascade = CascadeType.ALL)
    private List<SalesProduct> salesProducts;

    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date = new Date();

    @Column(name = "total")
    private BigDecimal total;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "sales_products",
            joinColumns = @JoinColumn(name = "id_sales"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<Product> products;



}