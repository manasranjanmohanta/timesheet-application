package com.ldtech.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {
    private String employeeId;
    private List<AllocateData> allocateData;
    private LocalDate activityAllocationDate;
}
