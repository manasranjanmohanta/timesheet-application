package com.ldtech.payloads;

import com.ldtech.entities.Employee;
import com.ldtech.entities.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeAllocationResponse {

    private String projectId;
    private String employeeId;
    private Project project;
    private Employee employee;
    private LocalDate allocationStartDate;
    private LocalDate allocationEndDate;
}
