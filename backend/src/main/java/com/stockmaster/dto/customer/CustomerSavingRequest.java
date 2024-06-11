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
public class CustomerSavingRequest {
    @NotBlank(message = "The name is null or empty")
    private String name;

    @NotBlank(message = "The personal code is null or empty")
    private String personalCode;

    @NotNull(message = "The customer type is null or non-existent")
    @Enumerated(EnumType.STRING)
    private CustomerType customerType;

}
