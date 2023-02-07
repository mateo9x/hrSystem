package com.mateo9x.hrsystem.dto;

import com.mateo9x.hrsystem.domain.AttendanceWorkReport;
import com.mateo9x.hrsystem.domain.DicAttendanceWorkType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AttendanceWorkDayDTO {

    private Long id;

    @NotNull
    private AttendanceWorkReport attendanceWorkReport;

    @NotNull
    private DicAttendanceWorkType dicAttendanceWorkType;

    @NotNull
    private Integer hours;

    @NotBlank
    private String comment;
}
