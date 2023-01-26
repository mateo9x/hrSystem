package com.mateo9x.hrsystem.dto;

import com.mateo9x.hrsystem.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AnnotationForUserDTO {

    private Long id;

    @NotNull
    private User user;

    @NotNull
    private LocalDateTime createDate;

    @NotBlank
    private String message;

    @NotNull
    private Boolean readed;
}
