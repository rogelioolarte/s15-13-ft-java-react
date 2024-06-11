package com.stockmaster.dto.sales;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.product.ProductResponse;
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
public class SalesDateResponse {

    private Long sale_id;
    private Long id_customer;
    private Long id_tax;
    private List<ProductResponse> product;
    private int quantity;
    private BigDecimal discount;
    private BigDecimal price;
    private String tax_name;
    private Date date;
    private BigDecimal total;

}
