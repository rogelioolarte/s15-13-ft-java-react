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
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    private String first_name;
    @Column(name = "lastname")
    private String last_name;
    private String email;
    private String password;

}
