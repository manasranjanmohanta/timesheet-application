package com.ldtech.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class EmployeeAllocationId implements Serializable {

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "employee_id")
    private String employeeId;

}