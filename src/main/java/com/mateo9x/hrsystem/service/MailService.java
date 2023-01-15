package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.UserDTO;

public interface MailService {

    void sendResetPasswordToken(UserDTO userDTO);


}
