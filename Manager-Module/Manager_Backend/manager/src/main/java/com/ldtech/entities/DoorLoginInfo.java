package com.ldtech.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "door_login_info")
public class DoorLoginInfo {

    @EmbeddedId
    private DoorLoginInfoId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", insertable = false, updatable = false)
    private Employee employee;

    @Column(name = "login_time")
    @NotNull
    private String loginTime;

    @Column(name = "logout_time")
    private String logoutTime;

//    @Column(name = "gross_hours")
//    @NotNull
//    private Float grossHours;
//
//    @Column(name = "activity_hours")
//    @NotNull
//    private Float activityHours;
}



