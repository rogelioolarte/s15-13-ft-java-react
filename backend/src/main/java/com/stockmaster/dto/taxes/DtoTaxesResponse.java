package com.stockmaster.dto.taxes;

import com.stockmaster.entity.Taxes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DtoTaxesResponse(@NotBlank Long id,@NotBlank String name, @NotNull BigDecimal percentage, Boolean active) {
    public DtoTaxesResponse(Taxes tax) {
        this(tax.getId(), tax.getName(),tax.getPercentage(), tax.getActive());
    }


}
