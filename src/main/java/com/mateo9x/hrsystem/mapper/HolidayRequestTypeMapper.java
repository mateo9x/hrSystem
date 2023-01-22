package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.HolidayRequestType;
import com.mateo9x.hrsystem.dto.HolidayRequestTypeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface HolidayRequestTypeMapper {

    HolidayRequestTypeMapper INSTANCE = Mappers.getMapper(HolidayRequestTypeMapper.class);

    HolidayRequestType toEntity(HolidayRequestTypeDTO holidayRequestTypeDTO);

    HolidayRequestTypeDTO toDTO(HolidayRequestType holidayRequestType);

    default HolidayRequestType fromId(Long id) {
        if (id == null) {
            return null;
        }
        HolidayRequestType holidayRequestType = new HolidayRequestType();
        holidayRequestType.setId(id);
        return holidayRequestType;
    }

}
