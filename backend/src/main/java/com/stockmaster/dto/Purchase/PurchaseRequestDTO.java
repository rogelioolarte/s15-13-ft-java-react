package com.stockmaster.dto.Purchase;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
public class PurchaseRequestDTO {
    private Long id;
    private Date date;
    private Long supplier_id;
    private String bill;
    private List<PurchaseProductDTO> products;

    // Getters and Setters
}