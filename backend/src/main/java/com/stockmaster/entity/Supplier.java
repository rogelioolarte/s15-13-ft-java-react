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
    @Column(name = "id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "companycode", unique = true, nullable = false)
    private String companyCode;

    @Column
    private boolean active = true;
    /*
        @ManyToMany
        @JoinTable(name = "supplier_product",
                joinColumns = @JoinColumn(name = "supplier_id"),
                inverseJoinColumns = @JoinColumn(name = "supplier_product_id"))
        private List<SupplierProduct> products;

        @OneToMany(mappedBy = "supplier")
        private List<Purchase> purchases;*/
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<SupplierProduct> products;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<Purchase> purchases;

    public boolean isActive() {
        return active;
    }
}