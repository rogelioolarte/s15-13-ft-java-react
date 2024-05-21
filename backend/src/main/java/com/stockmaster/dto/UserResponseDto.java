package com.stockmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String first_name;
    private String last_name;
    private String email;
}
