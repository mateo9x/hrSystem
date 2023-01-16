package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.config.JwtUtils;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@RequestMapping("/api")
@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/users/create-user")
    public ResponseEntity<UserDTO> saveUser(@RequestBody @Valid UserDTO userDTO) {
        return ResponseEntity.ok(userService.save(userDTO));
    }

    @GetMapping("/users/email/exists/{email}")
    public ResponseEntity<Boolean> doesUserWithEmailExists(@PathVariable String email) {
        return ResponseEntity.ok(userService.doesUserWithEmailExists(email));
    }

    @GetMapping("/users/jwt-token")
    public ResponseEntity<UserDTO> getUserByJWTToken(HttpServletRequest request) {
        String email = null;
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt") && isNotBlank(cookie.getValue())) {
                email = jwtUtils.extractEmailFromToken(cookie.getValue());
            }
        }
        if (isNotBlank(email)) {
            return ResponseEntity.ok(userService.findByEmail(email));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/users/reset-password/{email}")
    public ResponseEntity<Object> sendMailForResetPasswordProcedure(@PathVariable String email) {
        userService.sendMailForResetPasswordProcedure(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/token-user/{token}")
    public ResponseEntity<UserDTO> getUserByToken(@PathVariable String token) {
        return ResponseEntity.ok(userService.findByResetToken(token));
    }

    @PutMapping("/users/password/token")
    public ResponseEntity<Boolean> updatePasswordByToken(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUserPasswordFromToken(userDTO));
    }
}
