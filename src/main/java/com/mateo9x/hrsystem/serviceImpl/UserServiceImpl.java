package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.exceptions.UserException;
import com.mateo9x.hrsystem.mapper.UserMapper;
import com.mateo9x.hrsystem.repository.UserRepository;
import com.mateo9x.hrsystem.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO save(UserDTO userDTO) {
        log.info("Request to save User: {}", userDTO);
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserException("Użytkownik z podanym adresem e-mail już istnieje!");
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User savedUser = userRepository.save(userMapper.toEntity(userDTO));
        return userMapper.toDTO(savedUser);
    }
}
