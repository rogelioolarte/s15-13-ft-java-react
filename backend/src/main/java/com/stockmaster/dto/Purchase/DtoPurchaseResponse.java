package com.stockmaster.dto.Purchase;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public record DtoPurchaseResponse(@NotBlank String bill,

                                  @Temporal(TemporalType.DATE)
                                  @JsonFormat(pattern = "MM-dd-yyyy")
                                  @NotNull
                                  Date date,
                                  @NotNull
                                  Long supplier,
                                  @NotNull
                                  List<DtoPurchaseProductResponse> productList) {


}
