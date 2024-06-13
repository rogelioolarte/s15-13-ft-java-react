package com.stockmaster.entity.sales;

import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.customer.Customer;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record dtoSalesResponse(Long id,


                               Customer customer,

                               Taxes tax,



                               @Temporal(TemporalType.DATE)
                               Date date,

                               BigDecimal total,

                               List<com.stockmaster.dto.Purchase.ProductDtoResponsePUrchase> products) {
}
