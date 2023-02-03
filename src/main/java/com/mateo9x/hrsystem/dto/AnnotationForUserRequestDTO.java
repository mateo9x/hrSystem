package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.List;

@Value
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
public class AnnotationForUserRequestDTO {

    @NotNull
    List<Long> userIds;

    @NotNull
    LocalDateTime createDate;

    @NotBlank
    @Length(min = 10)
    String message;

}
