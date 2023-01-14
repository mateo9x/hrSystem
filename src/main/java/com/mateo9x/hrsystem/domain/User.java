package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "pesel")
    @Size(min = 11, max = 11)
    private String pesel;

    @Column(name = "roles")
    private String roles;

    @Column(name = "password")
    private String password;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "street")
    private String street;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "phone_number")
    @Size(min = 9, max = 9)
    private Integer phoneNumber;

}
