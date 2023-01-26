package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.AnnotationForUser;
import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AnnotationForUserMapper {

    public AnnotationForUser toEntity(AnnotationForUserDTO annotationForUserDTO) {
        if (annotationForUserDTO == null) {
            return null;
        }
        return AnnotationForUser.builder()
                .id(annotationForUserDTO.getId())
                .user(annotationForUserDTO.getUser())
                .message(annotationForUserDTO.getMessage())
                .createDate(annotationForUserDTO.getCreateDate())
                .readed(annotationForUserDTO.getReaded())
                .build();
    }

    public AnnotationForUserDTO toDTO(AnnotationForUser annotationForUser) {
        if (annotationForUser == null) {
            return null;
        }
        return AnnotationForUserDTO.builder()
                .id(annotationForUser.getId())
                .user(annotationForUser.getUser())
                .message(annotationForUser.getMessage())
                .createDate(annotationForUser.getCreateDate())
                .readed(annotationForUser.getReaded())
                .build();
    }


}
