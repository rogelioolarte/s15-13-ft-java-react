package com.stockmaster.entity;

import com.stockmaster.dto.taxes.DtoTaxesRquest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Taxes")
@Table(name = "taxes")
public class Taxes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name", unique = true, nullable = true)
    private String name;
    @Column(name = "personalcode", unique = true, nullable = true)
    private BigDecimal percentage;



    public Taxes(DtoTaxesRquest dtoTaxesRquest) {
        this.name = dtoTaxesRquest.name();
        this.percentage = dtoTaxesRquest.percentage();
    }
}
