package com.stockmaster.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSizeResponse {
    private String productName;
    private Integer quantity;
    private Double price;
    private Double discount;
}
