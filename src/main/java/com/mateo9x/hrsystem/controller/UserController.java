package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/users/create-user")
    public ResponseEntity<UserDTO> saveUser(@RequestBody @Valid UserDTO userDTO) {
        return ResponseEntity.ok(userService.save(userDTO));
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<Boolean> doesUserWithEmailExists(@PathVariable String email) {
        return ResponseEntity.ok(userService.doesUserWithEmailExists(email));
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
