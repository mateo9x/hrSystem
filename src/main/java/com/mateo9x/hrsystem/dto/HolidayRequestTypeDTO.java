package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HolidayRequestTypeDTO {

    private Long id;

    @NotBlank
    private String name;

}
