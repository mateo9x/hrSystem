package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.dto.UserDTO;

public interface MailService {

    void sendResetPasswordToken(UserDTO userDTO);

    void sendMessageToUserAboutAttendanceWorkReportForToday(UserDTO userDTO);

    void sendMessageToUserThatHisHolidayRequestStatusHasChanged(HolidayRequestDTO holidayRequestDTO, String oldStatus);


    void sendNewUserMail(UserDTO userDTO);
}
