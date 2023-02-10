package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    @NotBlank
    private String firstName;

    @Column(name = "last_name")
    @NotBlank
    private String lastName;

    @Column(name = "email")
    @NotBlank
    private String email;

    @Column(name = "pesel")
    @Size(min = 11, max = 11)
    @NotBlank
    private String pesel;

    @Column(name = "roles")
    private String roles;

    @Column(name = "password")
    @NotBlank
    @Size(min = 5)
    private String password;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "street")
    private String street;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "postal_code")
    @Size(min = 5, max = 5)
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "phone_number")
    @Size(min = 9, max = 9)
    private String phoneNumber;

    @Column(name = "theme")
    private String theme;

}
