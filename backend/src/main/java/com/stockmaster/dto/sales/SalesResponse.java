package com.stockmaster.dto.sales;

import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.customer.CustomerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesResponse {
    private Long id;
    private Long id_customer;
    private Long id_taxes;
    private Date date;
    private BigDecimal total;
}
