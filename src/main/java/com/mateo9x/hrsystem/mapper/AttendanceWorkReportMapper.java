package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.AttendanceWorkReport;
import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AttendanceWorkReportMapper {

    private final UserRepository userRepository;

    public AttendanceWorkReport toEntity(AttendanceWorkReportDTO attendanceWorkReportDTO) {
        if (attendanceWorkReportDTO == null) {
            return null;
        }
        return AttendanceWorkReport.builder()
                .id(attendanceWorkReportDTO.getId())
                .user(getUser(attendanceWorkReportDTO.getUserId()))
                .date(attendanceWorkReportDTO.getDate())
                .remoteWork(attendanceWorkReportDTO.getRemoteWork())
                .build();
    }

    public AttendanceWorkReportDTO toDTO(AttendanceWorkReport attendanceWorkReport) {
        if (attendanceWorkReport == null) {
            return null;
        }
        return AttendanceWorkReportDTO.builder()
                .id(attendanceWorkReport.getId())
                .userId(getUserId(attendanceWorkReport.getUser()))
                .date(attendanceWorkReport.getDate())
                .remoteWork(attendanceWorkReport.getRemoteWork())
                .build();
    }

    private Long getUserId(User user) {
        if (user == null) {
            return null;
        }
        return user.getId();
    }

    private User getUser(Long userId) {
        if (userId == null) {
            return null;
        }
        return userRepository.findById(userId).orElse(null);
    }
}
