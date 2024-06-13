package com.stockmaster.dto.product;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSalesSavedResponse {
    private String name;
    private String barcode;
    private BigDecimal salePrice;
    @NotNull
    private int quantity;
    @NotNull
    private BigDecimal discount;
}
