package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "holiday_requests")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HolidayRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "user_id")
    @OneToOne
    @NotNull
    private User user;

    @Column(name = "date_from")
    @NotNull
    private LocalDate dateFrom;

    @Column(name = "date_to")
    @NotNull
    private LocalDate dateTo;

    @Column(name = "total_hours")
    @NotNull
    private Integer totalHours;

    @Column(name = "comment")
    @Size(max = 255)
    private String comment;

    @JoinColumn(name = "request_type_id")
    @OneToOne
    @NotNull
    private HolidayRequestType holidayRequestType;

    @JoinColumn(name = "request_status_id")
    @OneToOne
    @NotNull
    private HolidayRequestStatus holidayRequestStatus;

}
