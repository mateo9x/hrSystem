package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.AttendanceWorkReport;
import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.mapper.AttendanceWorkReportMapper;
import com.mateo9x.hrsystem.repository.AttendanceWorkReportRepository;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AttendanceWorkReportServiceImpl implements AttendanceWorkReportService {

    private final AttendanceWorkReportMapper attendanceWorkReportMapper;
    private final AttendanceWorkReportRepository attendanceWorkReportRepository;

    @Override
    public AttendanceWorkReportDTO getUserSavedAttendanceWorkReportForToday(Long userId) {
        log.info("Request to get user saved attendance work report for today");
        AttendanceWorkReport attendanceWorkReport = attendanceWorkReportRepository.findAttendanceWorkReportByUserIdAndDate(userId, LocalDate.now()).orElse(null);
        if (attendanceWorkReport == null) {
            return null;
        }
        return attendanceWorkReportMapper.toDTO(attendanceWorkReport);
    }

    @Override
    public AttendanceWorkReportDTO saveAttendanceWorkReport(AttendanceWorkReportDTO attendanceWorkReportDTO) {
        log.info("Request to save user attendance work report for today; {}", attendanceWorkReportDTO);
        attendanceWorkReportDTO.setDate(LocalDate.now());
        AttendanceWorkReport attendanceWorkReport = attendanceWorkReportMapper.toEntity(attendanceWorkReportDTO);
        return attendanceWorkReportMapper.toDTO(attendanceWorkReportRepository.save(attendanceWorkReport));
    }

    @Override
    public List<AttendanceWorkReportDTO> getAllUsersSavedAttendanceWorkReportForToday() {
        log.info("Request to get users attendance work report for today");
        return attendanceWorkReportRepository.findAllAttendanceWorkReportByDate(LocalDate.now()).stream()
                .map(attendanceWorkReportMapper::toDTO).collect(Collectors.toList());
    }
}
