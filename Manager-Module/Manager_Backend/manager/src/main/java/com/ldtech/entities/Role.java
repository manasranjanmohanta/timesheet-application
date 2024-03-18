package com.ldtech.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role_master")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Size(max = 10)
    private long roleId;

    @Column(name = "role_name")
    @Size(max = 10)
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

}