package com.mateo9x.hrsystem.controller;

import com.mateo9x.hrsystem.dto.DicAttendanceWorkTypeDTO;
import com.mateo9x.hrsystem.service.DicAttendanceWorkTypeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
@Slf4j
public class DicAttendanceWorkTypeController {

    private final DicAttendanceWorkTypeService dicAttendanceWorkTypeService;

    @GetMapping("/dic-attendance-work-types")
    public ResponseEntity<List<DicAttendanceWorkTypeDTO>> getAllDicAttendanceWorkTypes() {
        log.info("REST request to get all dictionary attendance work types");
        return ResponseEntity.ok(dicAttendanceWorkTypeService.getAll());
    }
}
