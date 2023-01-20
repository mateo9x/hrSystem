package com.mateo9x.hrsystem.quartz;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import com.mateo9x.hrsystem.service.MailService;
import com.mateo9x.hrsystem.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuartzTasks {

    private final MailService mailService;
    private final UserService userService;
    private final AttendanceWorkReportService attendanceWorkReportService;

    @Scheduled(cron = "0 0 10 * * 2-6")
    public void sendEmailToUsersWhichDidntAttendantTodayTheirWorkReport() {
        List<UserDTO> allUsersWithRoleWorker = userService.getAllUsers().stream()
                .filter(user -> user.getRoles().contains("ROLE_WORKER")).toList();
        List<AttendanceWorkReportDTO> allAttendancesForToday = attendanceWorkReportService.getAllUsersSavedAttendanceWorkReportForToday();

        allUsersWithRoleWorker.forEach(userDTO -> sendEmailIfUserDidntSubmittedTodayAttendantWorkReport(userDTO, allAttendancesForToday));
    }

    private void sendEmailIfUserDidntSubmittedTodayAttendantWorkReport(UserDTO userDTO, List<AttendanceWorkReportDTO> allAttendancesForToday) {
        if (!doesTodayAttendancesContainsUser(userDTO, allAttendancesForToday)) {
            mailService.sendMessageToUserAboutAttendanceWorkReportForToday(userDTO);
        }
    }

    private boolean doesTodayAttendancesContainsUser(UserDTO userDTO, List<AttendanceWorkReportDTO> allAttendancesForToday) {
        return allAttendancesForToday.stream().anyMatch(attendanceWorkReport -> userDTO.getId().equals(attendanceWorkReport.getUserId()));
    }
}
