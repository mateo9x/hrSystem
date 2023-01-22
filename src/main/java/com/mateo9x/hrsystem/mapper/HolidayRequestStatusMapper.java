package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.HolidayRequestStatus;
import com.mateo9x.hrsystem.dto.HolidayRequestStatusDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface HolidayRequestStatusMapper {

    HolidayRequestStatusMapper INSTANCE = Mappers.getMapper(HolidayRequestStatusMapper.class);

    HolidayRequestStatus toEntity(HolidayRequestStatusDTO holidayRequestStatusDTO);

    HolidayRequestStatusDTO toDTO(HolidayRequestStatus holidayRequestStatus);

    default HolidayRequestStatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        HolidayRequestStatus holidayRequestStatus = new HolidayRequestStatus();
        holidayRequestStatus.setId(id);
        return holidayRequestStatus;
    }

}
