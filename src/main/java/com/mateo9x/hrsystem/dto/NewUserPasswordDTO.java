package com.mateo9x.hrsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserPasswordDTO {
    private Long userId;
    private String newPassword;
}
