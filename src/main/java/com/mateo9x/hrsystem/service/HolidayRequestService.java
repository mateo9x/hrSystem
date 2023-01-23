package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.HolidayRequestDTO;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRequestService {

    List<HolidayRequestDTO> getAllHolidayRequestsForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo);

    List<HolidayRequestDTO> getAllHolidayRequestsBetweenSelectedDates(LocalDate dateFrom, LocalDate dateTo);

    HolidayRequestDTO saveHolidayRequest(HolidayRequestDTO holidayRequestDTO, Boolean firstCreate);

    Boolean deleteHolidayRequest(Long id);
}
