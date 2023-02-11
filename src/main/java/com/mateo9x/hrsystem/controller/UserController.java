package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.NewUserPasswordDTO;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@AllArgsConstructor
@RestController
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/users/create-user")
    public ResponseEntity<UserDTO> saveUser(@RequestBody @Valid UserDTO userDTO) {
        log.info("REST request to save user");
        return ResponseEntity.ok(userService.save(userDTO, true));
    }

    @PutMapping("/users/update-user")
    public ResponseEntity<UserDTO> updateUser(@RequestBody @Valid UserDTO userDTO) {
        log.info("REST request to update user");
        return ResponseEntity.ok(userService.save(userDTO, false));
    }

    @GetMapping("/users/email/exists/{email}")
    public ResponseEntity<Boolean> doesUserWithEmailExists(@PathVariable String email) {
        log.info("REST request to check if user exists by email: {}", email);
        return ResponseEntity.ok(userService.doesUserWithEmailExists(email));
    }

    @GetMapping("/users/reset-password/{email}")
    public ResponseEntity<Object> sendMailForResetPasswordProcedure(@PathVariable String email) {
        log.info("REST request to send email to: {} for reset password procedure", email);
        userService.sendMailForResetPasswordProcedure(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/token-user/{token}")
    public ResponseEntity<UserDTO> getUserByResetToken(@PathVariable String token) {
        log.info("REST request to get user by reset token");
        return ResponseEntity.ok(userService.findByResetToken(token));
    }

    @PutMapping("/users/password/token")
    public ResponseEntity<Boolean> updateUserPasswordByToken(@Valid @RequestBody UserDTO userDTO) {
        log.info("REST request to update user password by token");
        return ResponseEntity.ok(userService.updateUserPasswordFromToken(userDTO));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        log.info("REST request to get all users");
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        log.info("REST request to delete user by id: {}", id);
        return ResponseEntity.ok(userService.deleteUserById(id));
    }

    @PutMapping("/users/password")
    public ResponseEntity<Boolean> updateUserPassword(@RequestBody @Valid NewUserPasswordDTO newUserPasswordDTO) {
        log.info("REST request to update user password");
        return ResponseEntity.ok(userService.updateUserPassword(newUserPasswordDTO));
    }
}
