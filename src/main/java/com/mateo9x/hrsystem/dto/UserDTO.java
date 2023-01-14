package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

public class UserDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    @Size(min = 11, max = 11)
    private String pesel;

    private List<String> roles;

    private String password;

    private String resetToken;

    private String street;

    private String streetNumber;

    private String postalCode;

    private String city;

    @Size(min = 9, max = 9)
    private Integer phoneNumber;
}
