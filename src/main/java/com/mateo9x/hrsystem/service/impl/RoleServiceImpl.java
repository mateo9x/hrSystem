package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.dto.RoleDTO;
import com.mateo9x.hrsystem.mapper.RoleMapper;
import com.mateo9x.hrsystem.repository.RoleRepository;
import com.mateo9x.hrsystem.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public List<RoleDTO> getAllRoles() {
        return roleRepository.findAll().stream().map(roleMapper::toDTO).collect(Collectors.toList());
    }
}
