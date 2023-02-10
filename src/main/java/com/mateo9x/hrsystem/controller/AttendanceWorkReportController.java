package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.AttendanceWorkReportDTO;
import com.mateo9x.hrsystem.service.AttendanceWorkReportService;
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
public class AttendanceWorkReportController {

    private final AttendanceWorkReportService attendanceWorkReportService;

    @GetMapping("/attendance-works/today/user/{userId}")
    public ResponseEntity<AttendanceWorkReportDTO> getUserSavedAttendanceWorkReportForToday(@PathVariable Long userId) {
        log.info("REST request to get user saved attendance work report for today by user id: {}", userId);
        return ResponseEntity.ok(attendanceWorkReportService.getUserSavedAttendanceWorkReportForToday(userId));
    }

    @GetMapping("/attendance-works/user/{userId}/{dateFrom}/{dateTo}")
    public ResponseEntity<List<AttendanceWorkReportDTO>> getAllSavedAttendanceWorksForUserBetweenSelectedDates(@PathVariable Long userId, @PathVariable LocalDate dateFrom, @PathVariable LocalDate dateTo) {
        log.info("REST request to get all attendance works for user: {} for dates between: {} - {}", userId, dateFrom, dateTo);
        return ResponseEntity.ok(attendanceWorkReportService.getAllSavedAttendanceWorksForUserBetweenSelectedDates(userId, dateFrom, dateTo));
    }

    @PostMapping("/attendance-works")
    public ResponseEntity<AttendanceWorkReportDTO> saveAttendanceWorkReport(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        log.info("REST request to save attendance work report");
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReport(attendanceWorkReportDTO));
    }

    @DeleteMapping("/attendance-works/{id}")
    public ResponseEntity<Boolean> deleteAttendanceWorkReportByIdCascade(@PathVariable Long id) {
        log.info("REST request to delete attendance work report cascade by id: {}", id);
        return ResponseEntity.ok(attendanceWorkReportService.deleteAttendanceWorkReportByIdCascade(id));
    }

    @PostMapping("/attendance-works/selected-date-by-user")
    public ResponseEntity<AttendanceWorkReportDTO> saveAttendanceWorkReportForSelectedDateByUser(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        log.info("REST request to save attendance work report");
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReportForSelectedDateByUser(attendanceWorkReportDTO));
    }

    @PutMapping("/attendance-works/selected-date-by-user")
    public ResponseEntity<AttendanceWorkReportDTO> updateAttendanceWorkReportForSelectedDateByUser(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        log.info("REST request to save attendance work report");
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReportForSelectedDateByUser(attendanceWorkReportDTO));
    }

    @PutMapping("/attendance-works")
    public ResponseEntity<AttendanceWorkReportDTO> updateAttendanceWorkReport(@RequestBody @Valid AttendanceWorkReportDTO attendanceWorkReportDTO) {
        log.info("REST request to update attendance work report");
        return ResponseEntity.ok(attendanceWorkReportService.saveAttendanceWorkReport(attendanceWorkReportDTO));
    }
}
