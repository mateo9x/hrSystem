package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AttendanceWorkDayDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkDayService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Slf4j
public class AttendanceWorkDayController {

    private final AttendanceWorkDayService attendanceWorkDayService;

    @GetMapping("/attendance-work-days/{userId}/{dateFrom}/{dateTo}")
    public ResponseEntity<List<AttendanceWorkDayDTO>> getAllAttendanceWorkDaysForUserBetweenSelectedDates(@PathVariable Long userId, @PathVariable LocalDate dateFrom, @PathVariable LocalDate dateTo) {
        log.info("REST request to get all attendance work days for user: {} between dates: {} - {}", userId, dateFrom, dateTo);
        return ResponseEntity.ok(attendanceWorkDayService.findAllForUserBetweenSelectedDates(userId, dateFrom, dateTo));
    }

    @PostMapping("/attendance-work-days")
    public ResponseEntity<AttendanceWorkDayDTO> saveAttendanceWorkDayForUser(@RequestBody @Valid AttendanceWorkDayDTO attendanceWorkDayDTO) {
        log.info("REST request to save attendance work day");
        return ResponseEntity.ok(attendanceWorkDayService.save(attendanceWorkDayDTO));
    }

    @PutMapping("/attendance-work-days")
    public ResponseEntity<AttendanceWorkDayDTO> updateAttendanceWorkDayForUser(@RequestBody @Valid AttendanceWorkDayDTO attendanceWorkDayDTO) {
        log.info("REST request to update attendance work day");
        return ResponseEntity.ok(attendanceWorkDayService.save(attendanceWorkDayDTO));
    }

    @DeleteMapping("/attendance-work-days/{id}")
    public ResponseEntity<Boolean> deleteAttendanceWorkDayForUser(@PathVariable Long id) {
        log.info("REST request to delete attendance work day by id: {}", id);
        return ResponseEntity.ok(attendanceWorkDayService.deleteById(id));
    }
}
