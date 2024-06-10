package com.stockmaster.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<SupplierProduct> products;


    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Purchase> purchases;

    public boolean isActive() {
        return active;
    }
}