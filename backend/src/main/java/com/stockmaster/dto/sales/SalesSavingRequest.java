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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesSavingRequest {
    @NotBlank
    private Customer id_customer;
    @NotBlank
    private Taxes id_taxes;
    @NotBlank
    private Date date;
    @NotNull
    private BigDecimal discount;
    @NotBlank
    private BigDecimal total;
}
