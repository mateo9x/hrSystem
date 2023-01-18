package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AttendanceWorkReportController {

    private final AttendanceWorkReportService attendanceWorkReportService;

    @GetMapping("/attendance-works/today/user/{userId}")
    public ResponseEntity<AttendanceWorkReportDTO> getUserSavedAttendanceWorkReportForToday(@PathVariable Long userId) {
        return ResponseEntity.ok(attendanceWorkReportService.getUserSavedAttendanceWorkReportForToday(userId));
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
