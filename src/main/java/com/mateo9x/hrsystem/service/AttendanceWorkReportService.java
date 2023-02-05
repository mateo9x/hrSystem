package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceWorkReportService {

    AttendanceWorkReportDTO getUserSavedAttendanceWorkReportForToday(Long userId);

    AttendanceWorkReportDTO saveAttendanceWorkReport(AttendanceWorkReportDTO attendanceWorkReportDTO);

    List<AttendanceWorkReportDTO> getAllUsersSavedAttendanceWorkReportForToday();

    List<AttendanceWorkReportDTO> getAllSavedAttendanceWorksForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo);
}
