package com.ldtech.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetResponse {
    private String employeeId;
    private String employeeName;
    private String reportingManager;
    private LocalDate logDate;
    private String loginTime;
    private String logoutTime;
    private List<ProjectInfos> project;
    private String approvalStatus;
}
