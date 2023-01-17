package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.dto.RoleDTO;
import com.mateo9x.hrsystem.mapper.RoleMapper;
import com.mateo9x.hrsystem.repository.RoleRepository;
import com.mateo9x.hrsystem.service.RoleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public List<RoleDTO> getAllRoles() {
        log.info("Request to get all roles");
        return roleRepository.findAll().stream().map(roleMapper::toDTO).collect(Collectors.toList());
    }
}
