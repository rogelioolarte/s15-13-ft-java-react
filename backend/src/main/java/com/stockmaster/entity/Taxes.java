package com.stockmaster.entity;

import com.stockmaster.dto.taxes.DtoTaxesResponse;
import com.stockmaster.dto.taxes.DtoTaxesRquest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Taxes")
@Table(name = "taxes")
@EqualsAndHashCode(of = "id")
public class Taxes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", unique = true, nullable = true)
    private String name;
    @Column(name = "percentage", unique = true, nullable = true)
    private BigDecimal percentage;

    @Column(name = "active")
    private Boolean active;

    public Taxes(DtoTaxesRquest dtoTaxesRquest) {
        this.name = dtoTaxesRquest.name();
        this.percentage = dtoTaxesRquest.percentage();
    }
    public Taxes(DtoTaxesResponse dtoTaxesResponse) {
        this.name = dtoTaxesResponse.name();
        this.percentage = dtoTaxesResponse.percentage();
    }
}
