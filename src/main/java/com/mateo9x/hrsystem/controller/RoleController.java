package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.RoleDTO;
import com.mateo9x.hrsystem.service.RoleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Slf4j
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/roles")
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        log.info("REST request to get all roles available for user to assign");
        return ResponseEntity.ok(roleService.getAllRoles());
    }
}
