package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.exceptions.UserException;
import com.mateo9x.hrsystem.mapper.UserMapper;
import com.mateo9x.hrsystem.repository.UserRepository;
import com.mateo9x.hrsystem.service.MailService;
import com.mateo9x.hrsystem.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    @Override
    public UserDTO save(UserDTO userDTO, Boolean firstCreate) {
        log.info("Request to save User: {}", userDTO);
        if (firstCreate && userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserException("Użytkownik z podanym adresem e-mail już istnieje!");
        }
        if (firstCreate) {
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        User savedUser = userRepository.save(userMapper.toEntity(userDTO));
        return userMapper.toDTO(savedUser);
    }

    @Override
    public Boolean doesUserWithEmailExists(String email) {
        log.info("Request to check if User with email: {} exists", email);
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public UserDTO findByEmail(String email) {
        log.info("Request to get User by email: {}", email);
        User user = userRepository.findByEmail(email).orElse(null);
        return userMapper.toDTO(user);
    }

    @Override
    public void sendMailForResetPasswordProcedure(String mail) {
        UUID uuid = UUID.randomUUID();
        Optional<User> user = userRepository.findByEmail(mail);
        if (user.isPresent()) {
            user.get().setResetToken(uuid.toString());
            userRepository.save(user.get());
            UserDTO dto = userMapper.toDTO(user.get());
            mailService.sendResetPasswordToken(dto);
        }
    }

    @Override
    public UserDTO findByResetToken(String token) {
        log.info("Request to find User by Reset Token: {}", token);
        Optional<User> user = userRepository.findByResetToken(token);
        return user.map(userMapper::toDTO).orElse(null);
    }

    @Override
    public Boolean updateUserPasswordFromToken(UserDTO userDTO) {
        Optional<User> userSavedOnBaseOptional = userRepository.findByResetToken(userDTO.getResetToken());
        if (userSavedOnBaseOptional.isPresent()) {
            User userSavedOnBase = userSavedOnBaseOptional.get();
            if (!doesBothPasswordMatches(userDTO, userSavedOnBase)) {
                log.info("Request to update User: {} password", userDTO.getEmail());
                userSavedOnBase.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                userSavedOnBase.setResetToken(null);
                userRepository.save(userSavedOnBase);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().filter(user -> !user.getEmail().equals("admin@admin.com"))
                .map(userMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public Boolean deleteUserById(Long id) {
        userRepository.deleteById(id);
        return userRepository.findById(id).isEmpty();
    }

    private boolean doesBothPasswordMatches(UserDTO userDTO, User userSavedOnBase) {
        return passwordEncoder.matches(userDTO.getPassword(), userSavedOnBase.getPassword());
    }
}
