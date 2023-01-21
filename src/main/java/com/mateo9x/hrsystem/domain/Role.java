package com.mateo9x.hrsystem.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "label")
    @NotNull
    private String label;

    @Column(name = "value")
    @NotNull
    private String value;

}
