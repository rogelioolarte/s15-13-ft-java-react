package com.stockmaster.dto.sales;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.stockmaster.dto.product.ProductResponse;
import com.stockmaster.dto.product.ProductSavingRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SalesResponse {
    private Long id_customer;
    private String tax;
    private Date date;
    @NotNull private List<ProductResponse> productSize;
    private BigDecimal totalPrice;

}
