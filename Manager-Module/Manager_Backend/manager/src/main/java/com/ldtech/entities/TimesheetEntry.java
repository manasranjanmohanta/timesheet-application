package com.ldtech.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "timesheet_Entry")
public class TimesheetEntry {

    @EmbeddedId
    private TimesheetEntryId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", insertable = false, updatable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", referencedColumnName = "project_id", insertable = false, updatable = false)
    private Project project;

    @Column(name = "tse_end_time")
    @NotNull
    private LocalTime endTime;

    @Column(name = "description")
    @Size(max = 50)
    private String description;

    @Column(name = "remark")
    @Size(max = 20)
    private String remark;

    @Column(name = "approval_status")
    @Size(max = 10)
    private String approvalStatus;

    @Column(name = "modified_date")
    @Temporal(TemporalType.DATE)
    private LocalDate modifiedDate;


}

