package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "holiday_request_types")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HolidayRequestType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    @NotBlank
    private String name;

}
