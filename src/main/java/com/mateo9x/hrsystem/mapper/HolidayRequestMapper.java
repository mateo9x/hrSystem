package com.mateo9x.hrsystem.mapper;

import com.mateo9x.hrsystem.domain.*;
import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.repository.HolidayRequestStatusRepository;
import com.mateo9x.hrsystem.repository.HolidayRequestTypeRepository;
import com.mateo9x.hrsystem.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HolidayRequestMapper {

    private final UserRepository userRepository;
    private final HolidayRequestTypeRepository holidayRequestTypeRepository;
    private final HolidayRequestStatusRepository holidayRequestStatusRepository;

    public HolidayRequest toEntity(HolidayRequestDTO holidayRequestDTO) {
        if (holidayRequestDTO == null) {
            return null;
        }
        return HolidayRequest.builder()
                .id(holidayRequestDTO.getId())
                .user(getUser(holidayRequestDTO.getUserId()))
                .dateFrom(holidayRequestDTO.getDateFrom())
                .dateTo(holidayRequestDTO.getDateTo())
                .totalHours(holidayRequestDTO.getTotalHours())
                .comment(holidayRequestDTO.getComment())
                .holidayRequestType(getHolidayRequestType(holidayRequestDTO.getHolidayRequestTypeId()))
                .holidayRequestStatus(getHolidayRequestStatus(holidayRequestDTO.getHolidayRequestStatusId()))
                .build();
    }

    public HolidayRequestDTO toDTO(HolidayRequest holidayRequest) {
        if (holidayRequest == null) {
            return null;
        }
        return HolidayRequestDTO.builder()
                .id(holidayRequest.getId())
                .userId(getUserId(holidayRequest.getUser()))
                .userFullName(getUserFullName(holidayRequest.getUser()))
                .userEmail(getUserEmail(holidayRequest.getUser()))
                .dateFrom(holidayRequest.getDateFrom())
                .dateTo(holidayRequest.getDateTo())
                .totalHours(holidayRequest.getTotalHours())
                .comment(holidayRequest.getComment())
                .holidayRequestTypeId(getHolidayRequestTypeId(holidayRequest.getHolidayRequestType()))
                .holidayRequestTypeName(getHolidayRequestTypeName(holidayRequest.getHolidayRequestType()))
                .holidayRequestStatusId(getHolidayRequestStatusId(holidayRequest.getHolidayRequestStatus()))
                .holidayRequestStatusName(getHolidayRequestStatusName(holidayRequest.getHolidayRequestStatus()))
                .build();
    }

    private Long getUserId(User user) {
        if (user == null) {
            return null;
        }
        return user.getId();
    }

    private Long getHolidayRequestTypeId(HolidayRequestType holidayRequestType) {
        if (holidayRequestType == null) {
            return null;
        }
        return holidayRequestType.getId();
    }

    private Long getHolidayRequestStatusId(HolidayRequestStatus holidayRequestStatus) {
        if (holidayRequestStatus == null) {
            return null;
        }
        return holidayRequestStatus.getId();
    }

    private String getHolidayRequestTypeName(HolidayRequestType holidayRequestType) {
        if (holidayRequestType == null) {
            return null;
        }
        return holidayRequestType.getName();
    }

    private String getHolidayRequestStatusName(HolidayRequestStatus holidayRequestStatus) {
        if (holidayRequestStatus == null) {
            return null;
        }
        return holidayRequestStatus.getName();
    }

    private User getUser(Long userId) {
        if (userId == null) {
            return null;
        }
        return userRepository.findById(userId).orElse(null);
    }

    private HolidayRequestType getHolidayRequestType(Long id) {
        if (id == null) {
            return null;
        }
        return holidayRequestTypeRepository.findById(id).orElse(null);
    }

    private HolidayRequestStatus getHolidayRequestStatus(Long id) {
        if (id == null) {
            return null;
        }
        return holidayRequestStatusRepository.findById(id).orElse(null);
    }

    private String getUserFullName(User user) {
        return user.getFirstName() + " " + user.getLastName();
    }

    private String getUserEmail(User user) {
        return user.getEmail();
    }
}
