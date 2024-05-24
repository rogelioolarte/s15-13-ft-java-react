package com.stockmaster.dto.taxes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DtoTaxesRquest(@NotBlank String name, @NotNull BigDecimal percentage) {
    public DtoTaxesRquest (@NotBlank String name, @NotBlank String percentage){
        this(  name, new BigDecimal(percentage) );
    }
    public DtoTaxesRquest (@NotBlank String name, @NotBlank Double percentage){
        this(  name, new BigDecimal(percentage) );
    }

}
