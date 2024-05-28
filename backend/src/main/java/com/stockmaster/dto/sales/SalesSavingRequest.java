package com.stockmaster.dto.sales;

import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.customer.CustomerType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class SalesSavingRequest {
    @NotNull
    private Customer id_customer;
    @NotNull
    private Set<Taxes> id_taxes;
    @NotNull
    private Date date;
    @NotNull
    private BigDecimal discount;
    @NotNull
    private BigDecimal total;
}
