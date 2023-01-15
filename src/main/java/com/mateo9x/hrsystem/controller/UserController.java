package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/users/create-user")
    public ResponseEntity<UserDTO> saveUser(@RequestBody @Valid UserDTO userDTO) {
        return ResponseEntity.ok(userService.save(userDTO));
    }
}
