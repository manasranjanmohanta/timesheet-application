package com.ldtech.services;

import com.ldtech.entities.Role;

import java.util.List;

public interface RoleService {
    Role saveRole(Role role);
    Role getRoleById(long roleId);
    List<Role> getAllRoles();
    void deleteRole(long roleId);
}
