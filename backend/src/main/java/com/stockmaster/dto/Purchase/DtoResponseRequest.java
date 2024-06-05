package com.stockmaster.dto.Purchase;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.Supplier;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

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

}
