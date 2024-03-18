package com.ldtech.payloads;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeDashboardResponse {
    private LocalDate logDate;
    private String employeeId;
    private String employeeName;
    private String projectName;
    private String department;
    private String client;
//    private int activityHour;
    private String approvalStatus;
}

