package com.mateo9x.hrsystem.authentication;

import com.mateo9x.hrsystem.config.JwtUtils;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.exceptions.AuthenthicationException;
import com.mateo9x.hrsystem.service.AuthenticationService;
import com.mateo9x.hrsystem.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.javatuples.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private static final String JWT_COOKIE = "jwt";
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("authenticate")
    public ResponseEntity<JWTToken> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        log.info("REST request to authenthicate user: {}", request.getEmail());
        Pair<String, Cookie> result = authenticationService.authenticateUser(request);
        String jwt = result.getValue0();
        response.addCookie(result.getValue1());
        if (jwt == null) {
            throw new AuthenthicationException("Uwierzytelnienie nie powiodło się");
        }
        return ResponseEntity.ok(new JWTToken(jwt));
    }

    @PostMapping("logout-user")
    public ResponseEntity<Boolean> logoutUser(HttpServletResponse response) {
        log.info("REST request to logout user");
        Cookie cookie = authenticationService.logoutUser();
        response.addCookie(cookie);
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @GetMapping("user")
    public ResponseEntity<UserDTO> getUserByJWTToken(HttpServletRequest request) {
        log.info("REST request to get user by jwt token");
        AtomicReference<String> email = new AtomicReference<>();
        Optional<Cookie> optionalCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> JWT_COOKIE.equals(cookie.getName()))
                .filter(cookie -> isNotBlank(cookie.getValue()))
                .findFirst();

        optionalCookie.ifPresent(cookie -> email.set(jwtUtils.extractEmailFromToken(cookie.getValue())));

        if (isNotBlank(email.get())) {
            return ResponseEntity.ok(userService.findByEmail(email.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @Value
    static class JWTToken {
        String token;
    }
}
