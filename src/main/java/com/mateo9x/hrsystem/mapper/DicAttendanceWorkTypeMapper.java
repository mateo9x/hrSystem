package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.DicAttendanceWorkType;
import com.mateo9x.hrsystem.dto.DicAttendanceWorkTypeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DicAttendanceWorkTypeMapper {

    DicAttendanceWorkTypeMapper INSTANCE = Mappers.getMapper(DicAttendanceWorkTypeMapper.class);

    DicAttendanceWorkType toEntity(DicAttendanceWorkTypeDTO dicAttendanceWorkTypeDTO);

    DicAttendanceWorkTypeDTO toDTO(DicAttendanceWorkType dicAttendanceWorkType);

    default DicAttendanceWorkType fromId(Long id) {
        if (id == null) {
            return null;
        }
        DicAttendanceWorkType dicAttendanceWorkType = new DicAttendanceWorkType();
        dicAttendanceWorkType.setId(id);
        return dicAttendanceWorkType;
    }

}
