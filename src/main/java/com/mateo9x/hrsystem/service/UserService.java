package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.UserDTO;

public interface UserService {

    UserDTO save(UserDTO userDTO);

    Boolean doesUserWithEmailExists(String email);

    UserDTO findByEmail(String email);

    void sendMailForResetPasswordProcedure(String email);

    UserDTO findByResetToken(String token);

    Boolean updateUserPasswordFromToken(UserDTO userDTO);
}
