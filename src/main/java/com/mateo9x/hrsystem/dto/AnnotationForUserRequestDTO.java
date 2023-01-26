package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Value
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
public class AnnotationForUserRequestDTO {

    @NotNull
    List<Long> userIds;

    LocalDateTime createDate;

    String message;

}
