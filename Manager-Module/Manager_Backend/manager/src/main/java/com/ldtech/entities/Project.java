package com.ldtech.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project_master")
public class Project {

    @Id
    @Column(name = "project_id")
    @Size(max = 10)
    private String projectId;

    @Column(name = "project_name")
    @Size(max = 20)
    private String projectName;

    @Column(name = "project_desc")
    @Size(max = 50)
    private String projectDescription;

    @Column(name = "project_manager")
    @Size(max = 30)
    private String projectManager;

    @Column(name = "client")
    @Size(max = 20)
    private String client;

    @Column(name = "billing_type")
    @Size(max = 20)
    private String billingType;

    @Column(name = "project_start_date")
    @Temporal(TemporalType.DATE)
    private LocalDate projectStartDate;

    @Column(name = "project_end_date")
    @Temporal(TemporalType.DATE)
    private LocalDate projectEndDate;

//    @JsonIgnore
//    @OneToMany(mappedBy = "project")
//    private List<EmployeeAllocation> allocations;

}
