package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.HolidayRequestType;
import com.mateo9x.hrsystem.dto.HolidayRequestTypeDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestTypeMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestTypeRepository;
import com.mateo9x.hrsystem.service.HolidayRequestTypeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;

@Slf4j
@AllArgsConstructor
@Service
public class HolidayRequestTypeServiceImpl implements HolidayRequestTypeService {

    private final HolidayRequestTypeRepository holidayRequestTypeRepository;
    private final HolidayRequestTypeMapper holidayRequestTypeMapper;

    @Override
    public List<HolidayRequestTypeDTO> getAll() {
        log.info("Request to get holiday request types");
        return holidayRequestTypeRepository.findAll()
                .stream()
                .sorted(comparing(HolidayRequestType::getName))
                .map(holidayRequestTypeMapper::toDTO)
                .collect(Collectors.toList());
    }
}
