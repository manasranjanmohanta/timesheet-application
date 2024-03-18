package com.ldtech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class TimesheetEntryId implements Serializable {

    @Column(name = "employee_id")
    private String employeeId;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "activity_type")
    @Size(max = 20)
    private String activityType;

    @Column(name = "log_date")
    @Temporal(TemporalType.DATE)
    private LocalDate logDate;

    @Column(name = "tse_start_time")
    @NotNull
    private LocalTime startTime;

}
