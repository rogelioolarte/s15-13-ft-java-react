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
    @NotBlank
    private String name;
    @NotBlank
    private String personalCode;
<<<<<<< HEAD

    @NotNull
    @Enumerated(EnumType.STRING)
    private CustomerType customerType;
    private boolean active;
=======
    @NotBlank
    private String customerType;
>>>>>>> a41fc7d252c33a693fa6b5015b4e8547a8d3a794
}
