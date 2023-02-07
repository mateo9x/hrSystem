package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@Slf4j
public class AnnotationForUserController {

    private final AnnotationForUserService annotationForUserService;

    @PostMapping("/annotations-for-users")
    public ResponseEntity<List<AnnotationForUserDTO>> saveAnnotationsForUsers(@RequestBody @Valid AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        log.info("REST request to save annotations for users");
        return ResponseEntity.ok(annotationForUserService.saveAnnotationsForUser(annotationForUserRequestDTO));
    }

    @GetMapping("/annotations-for-users/{id}")
    public ResponseEntity<List<AnnotationForUserDTO>> getAnnotationsForUser(@PathVariable Long id) {
        log.info("REST request to get annotations for user: {}", id);
        return ResponseEntity.ok(annotationForUserService.getAnnotationsForUser(id));
    }

    @PutMapping("/annotations-for-users/readed")
    public ResponseEntity<Boolean> updateAnnotationReadedValue(@RequestBody @Valid List<Long> ids) {
        log.info("REST request to update annotation readed value");
        return ResponseEntity.ok(annotationForUserService.updateAnnotationsReadedValues(ids));
    }

    @DeleteMapping("/annotations-for-users/{id}")
    public ResponseEntity<Boolean> deleteAnnotationById(@PathVariable Long id) {
        log.info("REST request to delete annotation by id: {}", id);
        return ResponseEntity.ok(annotationForUserService.deleteAnnotationById(id));
    }
}
