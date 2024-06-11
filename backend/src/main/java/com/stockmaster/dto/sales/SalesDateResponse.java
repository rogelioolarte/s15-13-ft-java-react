package com.stockmaster.dto.sales;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SalesDateResponse {

    private Long sale_id;
    private String customerName;
    private String personalCode;
    private String product_name;
    private int quantity;
    private BigDecimal discount;
    private BigDecimal price;
    private String tax_name;
    private BigDecimal total;


}
