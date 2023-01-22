package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.dto.HolidayRequestTypeDTO;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRequestService {

    List<HolidayRequestDTO> getAllHolidayRequestsForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo);

    HolidayRequestDTO saveHolidayRequest(HolidayRequestDTO holidayRequestDTO);

    Boolean deleteHolidayRequest(Long id);
}
