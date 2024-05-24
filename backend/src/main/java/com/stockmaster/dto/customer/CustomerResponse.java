package com.stockmaster.dto.customer;

import com.stockmaster.entity.customer.CustomerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private Long id;
    private String name;
    private String personalCode;
    private CustomerType customerType;
    private boolean active;
}
