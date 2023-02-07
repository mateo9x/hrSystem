package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.DicAttendanceWorkType;
import com.mateo9x.hrsystem.dto.DicAttendanceWorkTypeDTO;
import com.mateo9x.hrsystem.mapper.DicAttendanceWorkTypeMapper;
import com.mateo9x.hrsystem.repository.DicAttendanceWorkTypeRepository;
import com.mateo9x.hrsystem.service.DicAttendanceWorkTypeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DicAttendanceWorkTypeServiceImpl implements DicAttendanceWorkTypeService {

    private final DicAttendanceWorkTypeRepository dicAttendanceWorkTypeRepository;
    private final DicAttendanceWorkTypeMapper dicAttendanceWorkTypeMapper;

    @Override
    public DicAttendanceWorkType save(DicAttendanceWorkType dicAttendanceWorkType) {
        return dicAttendanceWorkTypeRepository.save(dicAttendanceWorkType);
    }

    @Override
    public List<DicAttendanceWorkTypeDTO> getAll() {
        return dicAttendanceWorkTypeRepository.findAll().stream()
                .map(dicAttendanceWorkTypeMapper::toDTO)
                .sorted(Comparator.comparing(DicAttendanceWorkTypeDTO::getName))
                .collect(Collectors.toList());
    }
}
