package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Supplier")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "company_code", unique = true, nullable = false)
    private String companyCode;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToMany
    @JoinTable(name = "supplier_product",
            joinColumns = @JoinColumn(name = "supplier_id"),
            inverseJoinColumns = @JoinColumn(name = "supplier_product_id"))
    private List<SupplierProduct> products;

}