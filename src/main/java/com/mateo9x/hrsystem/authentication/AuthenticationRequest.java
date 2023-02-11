package com.mateo9x.hrsystem.authentication;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
public class AuthenticationRequest {
    String email;
    String password;
    Boolean rememberMe;
}
