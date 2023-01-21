package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RoleDTO {

    @NotNull
    private String label;

    @NotNull
    private String value;

}
