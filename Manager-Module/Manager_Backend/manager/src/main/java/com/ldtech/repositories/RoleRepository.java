package com.ldtech.repositories;

import com.ldtech.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // You can add custom query methods here if needed
    Optional<Role> findByRoleName(String roleName);
}