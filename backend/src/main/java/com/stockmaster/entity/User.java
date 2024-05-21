package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name= "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String lastName;
    private String email;
    private String password;

}
