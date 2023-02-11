package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "holiday_request_statuses")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HolidayRequestStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotBlank
    private String name;
}
