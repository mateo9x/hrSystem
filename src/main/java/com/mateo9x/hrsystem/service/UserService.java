package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.dto.NewUserPasswordDTO;
import com.mateo9x.hrsystem.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO save(UserDTO userDTO, Boolean firstCreate);

    Boolean doesUserWithEmailExists(String email);

    UserDTO findByEmail(String email);

    void sendMailForResetPasswordProcedure(String email);

    UserDTO findByResetToken(String token);

    Boolean updateUserPasswordByTokenProcedure(String password, String token);

    List<UserDTO> getAllUsers();

    Boolean deleteUserById(Long id);

    Boolean updateUserPassword(NewUserPasswordDTO newUserPasswordDTO);
}
