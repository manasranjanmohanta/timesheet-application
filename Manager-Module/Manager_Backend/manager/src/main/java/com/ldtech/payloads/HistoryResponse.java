package com.ldtech.payloads;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryResponse {
    private String employeeId;

    private String employeeName;

    private LocalDate logDate;

    private String approvalStatus;

    private String projectName;

    private LocalDate modifiedDate;
}
