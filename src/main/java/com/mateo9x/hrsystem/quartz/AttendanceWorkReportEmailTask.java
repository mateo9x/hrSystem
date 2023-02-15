package com.mateo9x.hrsystem.quartz;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import com.mateo9x.hrsystem.service.HolidayRequestService;
import com.mateo9x.hrsystem.service.MailService;
import com.mateo9x.hrsystem.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@Service
@AllArgsConstructor
public class AttendanceWorkReportEmailTask {

    private static final String HOLIDAY_REQUEST_STATUS_ACCEPTED = "Zatwierdzono";
    private final MailService mailService;
    private final UserService userService;
    private final AttendanceWorkReportService attendanceWorkReportService;
    private final HolidayRequestService holidayRequestService;

    @Scheduled(cron = "0 0 10 * * MON-FRI")
    public void sendEmailToUsersWhichDidntAttendantTodayTheirWorkReport() {
        List<UserDTO> allUsersWithRoleWorker = userService.getAllUsers().stream()
                .filter(user -> user.getRoles() != null)
                .filter(user -> user.getRoles().contains("ROLE_WORKER")).toList();
        List<AttendanceWorkReportDTO> allAttendancesForToday = attendanceWorkReportService.getAllUsersSavedAttendanceWorkReportForToday();

        allUsersWithRoleWorker.forEach(userDTO -> sendEmailIfUserDidntSubmittedTodayAttendantWorkReport(userDTO, allAttendancesForToday));
    }

    private void sendEmailIfUserDidntSubmittedTodayAttendantWorkReport(UserDTO userDTO, List<AttendanceWorkReportDTO> allAttendancesForToday) {
        if (!doesTodayAttendancesContainsUser(userDTO, allAttendancesForToday) && !doesUserHasHolidayRequestAccepted(userDTO)) {
            mailService.sendMessageToUserAboutAttendanceWorkReportForToday(userDTO);
        }
    }

    private boolean doesTodayAttendancesContainsUser(UserDTO userDTO, List<AttendanceWorkReportDTO> allAttendancesForToday) {
        return allAttendancesForToday.stream().anyMatch(attendanceWorkReport -> userDTO.getId().equals(attendanceWorkReport.getUserId()));
    }

    private boolean doesUserHasHolidayRequestAccepted(UserDTO userDTO) {
        LocalDate today = LocalDate.now();
        List<HolidayRequestDTO> holidayRequestDTOList = holidayRequestService.getAllHolidayRequestsForUserBetweenSelectedDates(userDTO.getId(), today , today)
                .stream()
                .filter(holidayRequestDTO -> HOLIDAY_REQUEST_STATUS_ACCEPTED.equals(holidayRequestDTO.getHolidayRequestStatusName()))
                .collect(Collectors.toList());
        return isNotEmpty(holidayRequestDTOList);
    }
}
