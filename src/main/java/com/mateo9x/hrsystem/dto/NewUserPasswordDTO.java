package com.mateo9x.hrsystem.dto;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
public class NewUserPasswordDTO {
    Long userId;
    String newPassword;
    String token;
}
