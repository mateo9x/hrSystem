package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;

import java.util.List;

public interface AnnotationForUserService {

    List<AnnotationForUserDTO> saveAnnotationsForUser(AnnotationForUserRequestDTO annotationForUserRequestDTO);
}
