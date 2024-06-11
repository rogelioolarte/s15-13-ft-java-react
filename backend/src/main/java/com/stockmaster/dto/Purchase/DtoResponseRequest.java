package com.stockmaster.dto.Purchase;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stockmaster.entity.Purchase;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public record DtoResponseRequest(Long id,
                                 String bill,

                                 @Temporal(TemporalType.DATE)
                                 @JsonFormat(pattern = "MM-dd-yyyy")
                                 Date date,

                                 dtoSupplierPurchase supplier,

                                 List<ProductDtoResponsePUrchase> productList,
                                 BigDecimal total)

{
    public DtoResponseRequest(Purchase purchase){
        this(purchase.getId(),purchase.getBill(),purchase.getDate(),
                new dtoSupplierPurchase(purchase.getSupplier()),purchase.getProducts2().stream().map(ProductDtoResponsePUrchase::new).toList(),
                purchase.getTotal());
    }

}
