package com.ldtech.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee_master")
public class Employee {

    @Id
    @Column(name = "employee_id")
    @Size(max = 15)
    private String employeeId;

    @Column(name = "employee_name")
    @Size(max = 30)
    private String employeeName;

    @Column(name = "personal_email")
    @Size(max = 50)
    @Email
    private String personalEmail;

    @Column(name = "company_email")
    @Size(max = 50)
    @Email
    private String companyEmail;

//    @Column(name = "password")
//    @Size(max = 10)
//    private String password;

    @Column(name = "dob")
//    @Temporal(TemporalType.DATE)
//    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dob;

    @Column(name = "gender")
    @Size(max = 10)
    private String gender;

    @Column(name = "phone")
    @Size(max = 10)
    private String phone;

    @Column(name = "address")
    @Size(max = 125)
    private String address;

    @Column(name = "department")
    @Size(max = 30)
    private String department;

    @Column(name = "designation")
    @Size(max = 20)
    private String designation;

    @Column(name = "project_allocation_status")
    @Size(max = 20)
    private String projectAllocationStatus;

    @Column(name = "employee_status")
    @Size(max = 10)
    private String employeeStatus;

//    @OneToOne
//    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
//    private Role role;

//    @JsonIgnore
//    @OneToMany(mappedBy = "employee")
//    private List<EmployeeAllocation> allocations;

}
