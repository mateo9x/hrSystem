package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.dto.HolidayRequestStatusDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestStatusMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestStatusRepository;
import com.mateo9x.hrsystem.service.HolidayRequestStatusService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class HolidayRequestStatusServiceImpl implements HolidayRequestStatusService {

    private final HolidayRequestStatusRepository holidayRequestStatusRepository;
    private final HolidayRequestStatusMapper holidayRequestStatusMapper;

    @Override
    public List<HolidayRequestStatusDTO> getAll() {
        log.info("Request to get holiday request statuses");
        return holidayRequestStatusRepository.findAll().stream().map(holidayRequestStatusMapper::toDTO).collect(Collectors.toList());
    }
}
