package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AttendanceWorkReportDTO {

    private Long id;

    @NotNull
    private Long userId;

    private LocalDate date;

    @NotNull
    private Boolean remoteWork;
}
