package com.stockmaster.dto.Purchase;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PurchaseSearchDTO {
    private Date from;
    private Date to;

    // Getters and Setters
}