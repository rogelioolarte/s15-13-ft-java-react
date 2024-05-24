package com.stockmaster.dto.customer;

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
    @NotNull
    private Long id;
    @NotBlank
    private String name;
<<<<<<< HEAD
    @NotBlank
    private String personalCode;
=======
    //falta el personalcode
>>>>>>> d299b47f19a056ef6ad5a86d8973674df8b4b02a
}
