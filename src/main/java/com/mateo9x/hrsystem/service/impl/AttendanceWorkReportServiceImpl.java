package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.AttendanceWorkReport;
import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.mapper.AttendanceWorkReportMapper;
import com.mateo9x.hrsystem.repository.AttendanceWorkReportRepository;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttendanceWorkReportServiceImpl implements AttendanceWorkReportService {

    private final AttendanceWorkReportMapper attendanceWorkReportMapper;
    private final AttendanceWorkReportRepository attendanceWorkReportRepository;

    @Override
    public AttendanceWorkReportDTO getUserSavedAttendanceWorkReportForToday(Long userId) {
        AttendanceWorkReport attendanceWorkReport = attendanceWorkReportRepository.findAttendanceWorkReportByUserIdAndDate(userId, LocalDate.now()).orElse(null);
        if (attendanceWorkReport == null) {
            return null;
        }
        return attendanceWorkReportMapper.toDTO(attendanceWorkReport);
    }

    @Override
    public AttendanceWorkReportDTO saveAttendanceWorkReport(AttendanceWorkReportDTO attendanceWorkReportDTO) {
        attendanceWorkReportDTO.setDate(LocalDate.now());
        AttendanceWorkReport attendanceWorkReport = attendanceWorkReportMapper.toEntity(attendanceWorkReportDTO);
        return attendanceWorkReportMapper.toDTO(attendanceWorkReportRepository.save(attendanceWorkReport));
    }

    @Override
    public List<AttendanceWorkReportDTO> getAllUsersSavedAttendanceWorkReportForToday() {
        return attendanceWorkReportRepository.findAllAttendanceWorkReportByDate(LocalDate.now()).stream()
                .map(attendanceWorkReportMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<AttendanceWorkReportDTO> getAllSavedAttendanceWorksForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo) {
        return attendanceWorkReportRepository.findAllByUserIdAndDateGreaterThanEqualAndDateLessThanEqual(userId, dateFrom, dateTo)
                .stream()
                .map(attendanceWorkReportMapper::toDTO)
                .collect(Collectors.toList());
    }
}
