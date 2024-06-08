package com.stockmaster.dto.customer;

import com.stockmaster.entity.customer.CustomerType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerUpdateRequest {

    private String name;

    private String personalCode;

    @Enumerated(EnumType.STRING)
    private CustomerType customerType;

    private Boolean active;


}
