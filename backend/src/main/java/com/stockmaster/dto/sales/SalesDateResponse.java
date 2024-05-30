package com.stockmaster.dto.sales;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.stockmaster.dto.customer.CustomerDateResponse;
import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.product.ProductSizeResponse;
import com.stockmaster.dto.taxes.DtoTaxesResponse;
import com.stockmaster.dto.taxes.TaxesDateResponse;
import com.stockmaster.entity.customer.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SalesDateResponse {

    private Long id;//

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private Date date;//

    private CustomerDateResponse customer;
    private List<ProductSizeResponse> productSize;
    private TaxesDateResponse taxes;

    private BigDecimal totalPrice;

}
