package com.ldtech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DoorLoginInfoId implements Serializable {

    @Column(name = "employee_id")
    @NotNull
    private String employeeId;

    @Column(name = "log_date")
    @Temporal(TemporalType.DATE)
    @NotNull
    private LocalDate logDate;



}