package com.ldtech.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_authentication", uniqueConstraints = {@UniqueConstraint(columnNames = "companyEmail")})
public class User {
    @Id
    @Email
    @NotBlank
    private String companyEmail;

    @NotBlank
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
           name = "user_roles",
            joinColumns = @JoinColumn(name = "company_email", referencedColumnName = "companyEmail"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "roleId")
    )
    private Set<Role> roles;

}
