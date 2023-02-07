package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.domain.DicAttendanceWorkType;
import com.mateo9x.hrsystem.dto.DicAttendanceWorkTypeDTO;

import java.util.List;

public interface DicAttendanceWorkTypeService {

    DicAttendanceWorkType save(DicAttendanceWorkType dicAttendanceWorkType);

    List<DicAttendanceWorkTypeDTO> getAll();
}
