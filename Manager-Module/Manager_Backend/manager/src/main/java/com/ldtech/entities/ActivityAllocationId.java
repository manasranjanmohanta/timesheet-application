package com.ldtech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ActivityAllocationId implements Serializable {

    @Column(name = "employee_id")
    @NotNull
    private String employeeId;

    @Column(name = "project_id")
    @NotNull
    private String projectId;

//    @Column(name = "project_type", length = 100)
//    @Size(max = 15)
//    private String projectType;

    @Column(name = "activity_type", length = 100)
    @Size(max = 15)
    private String activityType;

    @Column(name = "activity_allocation_start_date")
    @NotNull
    private LocalDate activityStartDate;

}