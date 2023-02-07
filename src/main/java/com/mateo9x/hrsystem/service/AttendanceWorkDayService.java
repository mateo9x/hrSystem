package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.AttendanceWorkDayDTO;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceWorkDayService {

    List<AttendanceWorkDayDTO> findAllForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo);

    AttendanceWorkDayDTO save(AttendanceWorkDayDTO attendanceWorkDayDTO);

    Boolean deleteById(Long id);
}
