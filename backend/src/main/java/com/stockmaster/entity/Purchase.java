package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String bill;

    @Temporal(TemporalType.DATE)
    private Date date = new Date();


    @ManyToOne
    @JoinColumn(name = "id_supplier", referencedColumnName = "id")
    private Supplier supplier;

    private BigDecimal total;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "products_purchase",
            joinColumns = @JoinColumn(name = "id_purchase"),
            inverseJoinColumns = @JoinColumn(name = "id_product")
    )
    private List<Product> products;


    @OneToMany(mappedBy = "purchase",cascade = CascadeType.ALL)
    private List<PurchaseProduct> products2;



}