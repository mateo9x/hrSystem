package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.config.AdditionalAppProperties;
import com.mateo9x.hrsystem.dto.UserDTO;
import com.mateo9x.hrsystem.service.MailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final AdditionalAppProperties additionalAppProperties;

    @Override
    public void sendResetPasswordToken(UserDTO userDTO) {
        String url = additionalAppProperties.getFrontendUrl() + "/#/new-password?" + userDTO.getResetToken();
        String userFullName = userDTO.getFirstName() + " " + userDTO.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hrsystem.pl");
        message.setTo(userDTO.getEmail());
        message.setSubject("HR System - Resetowanie hasła");
        message.setText("Witaj " + userFullName + "!\n\nPoniżej znajduje się link do zresetowania hasła:\n\n" + url);
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Nie udało się wysłać maila resetującego hasła: {}", e.getMessage());
        }
    }
    @Override
    public void sendNewUserMail(UserDTO userDTO) {
        String userFullName = userDTO.getFirstName() + " " + userDTO.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hrsystem.pl");
        message.setTo(userDTO.getEmail());
        message.setSubject("HR System - Rejestracja konta");
        message.setText("Witaj " + userFullName + "!\n\nTwoje konto w portalu HR System zostało pomyślnie zarejestrowane.\n\nPoproś przełożonego o nadanie uprawnień w celu możliwości logowania do aplikacji. \n\nMiłego dnia :)");

        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Nie udało się wysłać maila powitalnego: {}", e.getMessage());
        }
    }

    @Override
    public void sendMessageToUserAboutAttendanceWorkReportForToday(UserDTO userDTO) {
        String userFullName = userDTO.getFirstName() + " " + userDTO.getLastName();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@hrsystem.pl");
        message.setTo(userDTO.getEmail());
        message.setSubject("HR System - Obecność w pracy");
        message.setText("Witaj " + userFullName + "!\n\nNie potwierdziłeś dzisiejszej obecności w pracy.\n" +
                "Zaloguj się do aplikacji i potwierdź swoją obecność.");
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Nie udało się wysłać maila z przypomnieniem o potwierdzeniu obecności w pracy: {}", e.getMessage());
        }
    }

}
