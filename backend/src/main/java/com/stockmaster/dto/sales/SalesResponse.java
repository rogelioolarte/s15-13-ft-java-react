package com.stockmaster.dto.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesResponse {
    private Long id;
    private Long id_customer;
    private Set<Long> id_taxes;
    private Date date;
    private BigDecimal total;
}
