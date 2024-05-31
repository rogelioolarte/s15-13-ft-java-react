package com.stockmaster.dto.Purchase;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public record DtoPurchaseResponse(@NotBlank String bill,

                                  @DateTimeFormat(pattern = "MM-dd-yyyy")
                                  @NotNull
                                  Date date,
                                  @NotNull
                                  Long supplier,
                                  @NotNull
                                  List<DtoPurchaseProductResponse> productList) {
}
