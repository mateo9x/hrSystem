package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.AttendanceWorkDay;
import com.mateo9x.hrsystem.dto.AttendanceWorkDayDTO;
import com.mateo9x.hrsystem.mapper.AttendanceWorkDayMapper;
import com.mateo9x.hrsystem.repository.AttendanceWorkDayRepository;
import com.mateo9x.hrsystem.service.AttendanceWorkDayService;
import com.mateo9x.hrsystem.service.DicAttendanceWorkTypeService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class AttendanceWorkDayServiceImpl implements AttendanceWorkDayService {

    private final AttendanceWorkDayMapper attendanceWorkDayMapper;
    private final AttendanceWorkDayRepository attendanceWorkDayRepository;
    private final DicAttendanceWorkTypeService dicAttendanceWorkTypeService;

    @Override
    public List<AttendanceWorkDayDTO> findAllForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo) {
        return attendanceWorkDayRepository.findAllForUserBetweenSelectedDates(userId, dateFrom, dateTo).stream()
                .map(attendanceWorkDayMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceWorkDayDTO save(AttendanceWorkDayDTO attendanceWorkDayDTO) {
        if (attendanceWorkDayDTO.getDicAttendanceWorkType().getId() == null) {
            attendanceWorkDayDTO.setDicAttendanceWorkType(dicAttendanceWorkTypeService.save(attendanceWorkDayDTO.getDicAttendanceWorkType()));
        }
        AttendanceWorkDay attendanceWorkDay = attendanceWorkDayMapper.toEntity(attendanceWorkDayDTO);
        attendanceWorkDay = attendanceWorkDayRepository.save(attendanceWorkDay);
        return attendanceWorkDayMapper.toDTO(attendanceWorkDay);
    }

    @Override
    public Boolean deleteById(Long id) {
        attendanceWorkDayRepository.deleteById(id);
        return attendanceWorkDayRepository.findById(id).isEmpty();
    }

    @Override
    public List<AttendanceWorkDayDTO> findAllByAttendanceWorkReportId(Long attendanceWorkReportId) {
        return attendanceWorkDayRepository.findAllByAttendanceWorkReportId(attendanceWorkReportId).stream()
                .map(attendanceWorkDayMapper::toDTO)
                .collect(Collectors.toList());
    }
}
