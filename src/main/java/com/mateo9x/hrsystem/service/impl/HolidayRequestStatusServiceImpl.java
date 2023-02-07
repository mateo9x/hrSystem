package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.dto.HolidayRequestStatusDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestStatusMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestStatusRepository;
import com.mateo9x.hrsystem.service.HolidayRequestStatusService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class HolidayRequestStatusServiceImpl implements HolidayRequestStatusService {

    private final HolidayRequestStatusRepository holidayRequestStatusRepository;
    private final HolidayRequestStatusMapper holidayRequestStatusMapper;

    @Override
    public List<HolidayRequestStatusDTO> getAll() {
        return holidayRequestStatusRepository.findAll().stream().map(holidayRequestStatusMapper::toDTO).collect(Collectors.toList());
    }
}
