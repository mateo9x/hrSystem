package com.mateo9x.hrsystem.authentication;

import com.mateo9x.hrsystem.exceptions.AuthenthicationException;
import com.mateo9x.hrsystem.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.javatuples.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

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

    @Value
    static class JWTToken {
        String token;
    }
}
