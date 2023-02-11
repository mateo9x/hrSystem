package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.UserDTO;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserMapper {

    public User toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        return User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail().toLowerCase())
                .password(userDTO.getPassword())
                .roles(convertArrayRolesToString(userDTO.getRoles()))
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .pesel(userDTO.getPesel())
                .street(userDTO.getStreet())
                .streetNumber(userDTO.getStreetNumber())
                .postalCode(userDTO.getPostalCode())
                .city(userDTO.getCity())
                .phoneNumber(userDTO.getPhoneNumber())
                .resetToken(userDTO.getResetToken())
                .build();
    }

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles() != null ? Arrays.asList(user.getRoles().split(";")) : null)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .pesel(user.getPesel())
                .street(user.getStreet())
                .streetNumber(user.getStreetNumber())
                .postalCode(user.getPostalCode())
                .city(user.getCity())
                .phoneNumber(user.getPhoneNumber())
                .resetToken(user.getResetToken())
                .build();
    }

    private String convertArrayRolesToString(List<String> roles) {
        if (CollectionUtils.isNotEmpty(roles)) {
            return roles.stream().collect(Collectors.joining(";"));
        }
        return null;
    }
}
