package com.mateo9x.hrsystem.authentication;

import com.mateo9x.hrsystem.config.AdditionalAppProperties;
import com.mateo9x.hrsystem.config.JwtUtils;
import com.mateo9x.hrsystem.exceptions.AuthenthicationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class AuthenthicationController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final JwtUtils jwtUtils;

    private final AdditionalAppProperties appProperties;

    @PostMapping("authenticate")
    public ResponseEntity<JWTToken> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword(),
                            new ArrayList<>()));
            final UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
            if (user != null) {
                String jwt = jwtUtils.generateToken(user);
                Cookie cookie = new Cookie("jwt", jwt);
                cookie.setMaxAge(getExpirationTime(request.getRememberMe()));
                cookie.setHttpOnly(true);
                cookie.setPath("/"); // Global
                response.addCookie(cookie);
                return ResponseEntity.ok().body(new JWTToken(jwt));
            }
            throw new AuthenthicationException("Błąd uwierzytelniania!");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new AuthenthicationException(e.getMessage());
        }
    }

    private Integer getExpirationTime(Boolean rememberMe) {
        return rememberMe ? appProperties.getJwtExpirationTimeRememberMe() : appProperties.getJwtExpirationTime();
    }

    @Value
    static class JWTToken {
        String token;
    }
}
