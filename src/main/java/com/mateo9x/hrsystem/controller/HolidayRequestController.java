package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.dto.HolidayRequestStatusDTO;
import com.mateo9x.hrsystem.dto.HolidayRequestTypeDTO;
import com.mateo9x.hrsystem.service.HolidayRequestService;
import com.mateo9x.hrsystem.service.HolidayRequestStatusService;
import com.mateo9x.hrsystem.service.HolidayRequestTypeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
@Slf4j
public class HolidayRequestController {

    private final HolidayRequestTypeService holidayRequestTypeService;
    private final HolidayRequestStatusService holidayRequestStatusService;
    private final HolidayRequestService holidayRequestService;

    @GetMapping("/holiday-requests-types")
    public ResponseEntity<List<HolidayRequestTypeDTO>> getAllHolidayRequestTypes() {
        log.info("REST request to get all holiday request types");
        return ResponseEntity.ok(holidayRequestTypeService.getAll());
    }

    @GetMapping("/holiday-requests-statuses")
    public ResponseEntity<List<HolidayRequestStatusDTO>> getAllHolidayRequestStatuses() {
        log.info("REST request to get all holiday request statuses");
        return ResponseEntity.ok(holidayRequestStatusService.getAll());
    }

    @GetMapping("/holiday-requests/{userId}/{dateFrom}/{dateTo}")
    public ResponseEntity<List<HolidayRequestDTO>> getAllHolidayRequestsForUserBetweenSelectedDates(@PathVariable Long userId, @PathVariable LocalDate dateFrom, @PathVariable LocalDate dateTo) {
        log.info("REST request to get all holiday request types");
        return ResponseEntity.ok(holidayRequestService.getAllHolidayRequestsForUserBetweenSelectedDates(userId, dateFrom, dateTo));
    }

    @GetMapping("/holiday-requests/{dateFrom}/{dateTo}")
    public ResponseEntity<List<HolidayRequestDTO>> getAllHolidayRequestsBetweenSelectedDates(@PathVariable LocalDate dateFrom, @PathVariable LocalDate dateTo) {
        log.info("REST request to get all holiday request types between dates: {} - {}", dateFrom, dateTo);
        return ResponseEntity.ok(holidayRequestService.getAllHolidayRequestsBetweenSelectedDates(dateFrom, dateTo));
    }

    @PostMapping("/holiday-requests")
    public ResponseEntity<HolidayRequestDTO> saveHolidayRequests(@RequestBody @Valid HolidayRequestDTO holidayRequestDTO) {
        log.info("REST request to save holiday request");
        return ResponseEntity.ok(holidayRequestService.saveHolidayRequest(holidayRequestDTO, true));
    }

    @PutMapping("/holiday-requests")
    public ResponseEntity<HolidayRequestDTO> updateHolidayRequests(@RequestBody @Valid HolidayRequestDTO holidayRequestDTO) {
        log.info("REST request to update holiday request");
        return ResponseEntity.ok(holidayRequestService.saveHolidayRequest(holidayRequestDTO, false));
    }

    @DeleteMapping("/holiday-requests/{id}")
    public ResponseEntity<Boolean> deleteHolidayRequests(@PathVariable Long id) {
        log.info("REST request to delete holiday request by id: {}", id);
        return ResponseEntity.ok(holidayRequestService.deleteHolidayRequest(id));
    }
}
