package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.AttendanceWorkDay;
import com.mateo9x.hrsystem.dto.AttendanceWorkDayDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AttendanceWorkDayMapper {

    AttendanceWorkDayMapper INSTANCE = Mappers.getMapper(AttendanceWorkDayMapper.class);

    AttendanceWorkDay toEntity(AttendanceWorkDayDTO attendanceWorkDayDTO);

    AttendanceWorkDayDTO toDTO(AttendanceWorkDay attendanceWorkDay);

    default AttendanceWorkDay fromId(Long id) {
        if (id == null) {
            return null;
        }
        AttendanceWorkDay attendanceWorkDay = new AttendanceWorkDay();
        attendanceWorkDay.setId(id);
        return attendanceWorkDay;
    }

}
