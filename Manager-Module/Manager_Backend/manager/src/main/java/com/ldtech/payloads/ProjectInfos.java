package com.ldtech.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectInfos {
    private String projectName;
    private String projectType;
    private String activityType;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;
    private String remark;
}
