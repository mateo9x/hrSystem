package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AttendanceWorkReportController {

    private final AttendanceWorkReportService attendanceWorkReportService;

    @GetMapping("/attendance-works/today/user/{userId}")
    public ResponseEntity<AttendanceWorkReportDTO> getUserSavedAttendanceWorkReportForToday(@PathVariable Long userId) {
        return ResponseEntity.ok(attendanceWorkReportService.getUserSavedAttendanceWorkReportForToday(userId));
    }

    @GetMapping("/attendance-works/user/{userId}/{dateFrom}/{dateTo}")
    public ResponseEntity<List<AttendanceWorkReportDTO>> getAllSavedAttendanceWorksForUserBetweenSelectedDates(@PathVariable Long userId, @PathVariable LocalDate dateFrom, @PathVariable LocalDate dateTo) {
        return ResponseEntity.ok(attendanceWorkReportService.getAllSavedAttendanceWorksForUserBetweenSelectedDates(userId, dateFrom, dateTo));
    }

    @PostMapping("/attendance-works")
    public ResponseEntity<AttendanceWorkReportDTO> saveAttendanceWorkReport(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReport(attendanceWorkReportDTO));
    }

    @PutMapping("/attendance-works")
    public ResponseEntity<AttendanceWorkReportDTO> updateAttendanceWorkReport(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReport(attendanceWorkReportDTO));
    }
}
