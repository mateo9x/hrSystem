package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "attendance_work_days")
public class AttendanceWorkDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "attendance_work_report_id")
    @NotNull
    private AttendanceWorkReport attendanceWorkReport;

    @OneToOne
    @JoinColumn(name = "dic_attendance_work_id")
    @NotNull
    private DicAttendanceWorkType dicAttendanceWorkType;

    @Column(name = "hours")
    @NotNull
    private Integer hours;

    @Column(name = "comment")
    @NotBlank
    private String comment;
}
