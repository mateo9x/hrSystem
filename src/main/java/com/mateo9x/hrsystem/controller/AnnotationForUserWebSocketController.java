package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class AnnotationForUserWebSocketController {

    private final AnnotationForUserService annotationForUserService;

    @MessageMapping("/annotations")
    @SendTo("/ws/annotations")
    public List<AnnotationForUserDTO> chat(Long userId) {
        System.out.println(userId);
        return annotationForUserService.getAnnotationsForUser(userId);
    }

}
