package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.authentication.AuthenticationRequest;
import com.mateo9x.hrsystem.authentication.UserDetailsService;
import com.mateo9x.hrsystem.config.AdditionalAppProperties;
import com.mateo9x.hrsystem.config.JwtUtils;
import com.mateo9x.hrsystem.exceptions.AuthenthicationException;
import com.mateo9x.hrsystem.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.javatuples.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final JwtUtils jwtUtils;

    private final AdditionalAppProperties appProperties;


    @Override
    public Pair<String, Cookie> authenticateUser(AuthenticationRequest request) {
        try {
            final UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
            if (user != null) {
                if (user.getAuthorities() == null) {
                    throw new AuthenthicationException("Brak nadanych roli dla tego użytkownika. Skontaktuj się z przełożonym w celu nadania uprawnień do aplikacji");
                }
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword(),
                                new ArrayList<>()));
                String jwt = jwtUtils.generateToken(user, request.getRememberMe());
                Cookie cookie = new Cookie("jwt", jwt);
                cookie.setMaxAge(getExpirationTime(request.getRememberMe()));
                cookie.setHttpOnly(!appProperties.getLocalRunningApp());
                cookie.setSecure(!appProperties.getLocalRunningApp());
                cookie.setPath("/");
                return new Pair<String, Cookie>(jwt, cookie);
            }
            throw new AuthenthicationException("Błąd uwierzytelniania!");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new AuthenthicationException(e.getMessage());
        }
    }

    @Override
    public Cookie logoutUser() {
        SecurityContextHolder.clearContext();
        Cookie cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(!appProperties.getLocalRunningApp());
        cookie.setSecure(!appProperties.getLocalRunningApp());
        cookie.setPath("/");
        return cookie;
    }

    private Integer getExpirationTime(Boolean rememberMe) {
        return rememberMe ? appProperties.getJwtExpirationTimeRememberMe() : appProperties.getJwtExpirationTime();
    }

}

