package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/annotations-for-users/{id}")
    public ResponseEntity<List<AnnotationForUserDTO>> getAnnotationsForUser(@PathVariable Long id) {
        return ResponseEntity.ok(annotationForUserService.getAnnotationsForUser(id));
    }

    @PutMapping("/annotations-for-users/readed")
    public ResponseEntity<Boolean> updateAnnotationReadedValue(@RequestBody @Valid Long id) {
        return ResponseEntity.ok(annotationForUserService.updateAnnotationReadedValue(id));
    }

    @DeleteMapping("/annotations-for-users/{id}")
    public ResponseEntity<Boolean> deleteAnnotationById(@PathVariable Long id) {
        return ResponseEntity.ok(annotationForUserService.deleteAnnotationById(id));
    }
}
