package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
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

    @Size(min= 6, max=6)
    private String postalCode;

    private String city;

    @Range(min = 9, max = 9)
    private Integer phoneNumber;
}
