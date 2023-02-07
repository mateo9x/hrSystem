package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.HolidayRequestType;
import com.mateo9x.hrsystem.dto.HolidayRequestTypeDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestTypeMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestTypeRepository;
import com.mateo9x.hrsystem.service.HolidayRequestTypeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;

@AllArgsConstructor
@Service
public class HolidayRequestTypeServiceImpl implements HolidayRequestTypeService {

    private final HolidayRequestTypeRepository holidayRequestTypeRepository;
    private final HolidayRequestTypeMapper holidayRequestTypeMapper;

    @Override
    public List<HolidayRequestTypeDTO> getAll() {
        return holidayRequestTypeRepository.findAll()
                .stream()
                .sorted(comparing(HolidayRequestType::getName))
                .map(holidayRequestTypeMapper::toDTO)
                .collect(Collectors.toList());
    }
}
