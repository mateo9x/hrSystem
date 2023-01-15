package com.mateo9x.hrsystem.config;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;

@Configuration
@Validated
@Data
@PropertySource("classpath:application.properties")
public class AdditionalAppProperties {

    @NotNull
    @Value("${jwt.expirationTime}")
    private Integer jwtExpirationTime;

    @NotNull
    @Value("${jwt.expirationTime.rememberMe}")
    private Integer jwtExpirationTimeRememberMe;

    @NotNull
    @Value("${frontend.url}")
    private String frontendUrl;
}
