package com.mateo9x.hrsystem.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HolidayRequestDTO {

    private Long id;

    @NotNull
    private Long userId;

    private String userFullName;

    private String userEmail;

    @NotNull
    private LocalDate dateFrom;

    @NotNull
    private LocalDate dateTo;

    @NotNull
    private Integer totalHours;

    @Size(max = 255)
    private String comment;

    @NotNull
    private Long holidayRequestTypeId;

    private String holidayRequestTypeName;

    @NotNull
    private Long holidayRequestStatusId;

    private String holidayRequestStatusName;

}
