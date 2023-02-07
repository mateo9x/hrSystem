package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DicAttendanceWorkTypeDTO {

    private Long id;

    @NotBlank
    private String name;
}
