package com.stockmaster.dto.Purchase;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class PurchaseDatesDTO {
    private Date date;
    private BigDecimal total;

    // Getters and Setters
}