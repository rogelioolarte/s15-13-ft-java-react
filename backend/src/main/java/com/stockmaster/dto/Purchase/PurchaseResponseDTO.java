package com.stockmaster.dto.Purchase;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PurchaseResponseDTO {
    private Long id;
    private String bill;
    private Date date;
    private SupplierResponseDTO supplier;
    private List<PurchaseProductDTO> products;
    private BigDecimal total;

}