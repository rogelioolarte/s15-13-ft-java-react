package com.stockmaster.dto;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierResponseDTO {
    private Long id;
    private String name;
    private String companyCode;
    private boolean active;

    public boolean isActive() {
        return active;
    }
}