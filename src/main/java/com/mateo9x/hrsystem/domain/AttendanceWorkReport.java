package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "attendance_work_reports")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttendanceWorkReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "date")
    @NotNull
    private LocalDate date;

    @Column(name = "remote_work")
    @NotNull
    private Boolean remoteWork;

}
