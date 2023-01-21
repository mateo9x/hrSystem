package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "attendance_work_reports")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttendanceWorkReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "user_id")
    @OneToOne
    @NotNull
    private User user;

    @Column(name = "date")
    @NotNull
    private LocalDate date;

    @Column(name = "remote_work")
    @NotNull
    private Boolean remoteWork;

}
