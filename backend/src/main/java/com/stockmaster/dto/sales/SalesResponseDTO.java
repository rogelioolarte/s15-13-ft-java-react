package com.stockmaster.dto.sales;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.customer.CustomerSalesSavedResponse;
import com.stockmaster.dto.product.ProductResponse;
import com.stockmaster.dto.product.ProductSalesSavedResponse;
import com.stockmaster.dto.taxes.TaxesResponse;
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
public class SalesResponseDTO {
    private Long id;
    private CustomerSalesSavedResponse customer;
    private TaxesResponse tax;
    private Date date;
    private List<ProductSalesSavedResponse> products;
    private BigDecimal totalPrice;
}
