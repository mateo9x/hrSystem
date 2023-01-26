package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class AnnotationForUserController {

    private final AnnotationForUserService annotationForUserService;

    @PostMapping("/annotations-for-users")
    public ResponseEntity<List<AnnotationForUserDTO>> saveAnnotationsForUsers(@RequestBody @Valid AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        return ResponseEntity.ok(annotationForUserService.saveAnnotationsForUser(annotationForUserRequestDTO));
    }
}
