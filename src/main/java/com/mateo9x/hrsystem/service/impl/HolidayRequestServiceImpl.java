package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.HolidayRequest;
import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestRepository;
import com.mateo9x.hrsystem.service.HolidayRequestService;
import com.mateo9x.hrsystem.service.MailService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Transactional
public class HolidayRequestServiceImpl implements HolidayRequestService {

    private final HolidayRequestRepository holidayRequestRepository;
    private final HolidayRequestMapper holidayRequestMapper;
    private final MailService mailService;

    @Override
    public List<HolidayRequestDTO> getAllHolidayRequestsForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo) {
        return holidayRequestRepository.findAllByUserIdAndDateFromGreaterThanEqualAndDateFromLessThanEqual(userId, dateFrom, dateTo)
                .stream()
                .map(holidayRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HolidayRequestDTO> getAllHolidayRequestsBetweenSelectedDatesPending(LocalDate dateFrom, LocalDate dateTo) {
        return holidayRequestRepository.findAllByDateFromGreaterThanEqualAndDateFromLessThanEqual(dateFrom, dateTo)
                .stream()
                .map(holidayRequestMapper::toDTO)
                .filter(holidayRequest -> holidayRequest.getHolidayRequestStatusName().equals("Wysłano"))
                .sorted(Comparator.comparing(HolidayRequestDTO::getUserFullName))
                .collect(Collectors.toList());
    }

    @Override
    public HolidayRequestDTO saveHolidayRequest(HolidayRequestDTO holidayRequestDTO, Boolean firstCreate) {
        HolidayRequest holidayRequest = holidayRequestMapper.toEntity(holidayRequestDTO);
        if (!firstCreate) {
            HolidayRequest holidayRequestSavedOnDb = holidayRequestRepository.findById(holidayRequestDTO.getId()).orElse(null);
            if (holidayRequestSavedOnDb != null && doesStatusChanged(holidayRequestDTO.getHolidayRequestStatusName(), holidayRequestSavedOnDb.getHolidayRequestStatus().getName())) {
                mailService.sendMessageToUserThatHisHolidayRequestStatusHasChanged(holidayRequestDTO, holidayRequestSavedOnDb.getHolidayRequestStatus().getName());
            }
        }
        holidayRequestRepository.save(holidayRequest);
        return holidayRequestMapper.toDTO(holidayRequest);
    }

    @Override
    public Boolean deleteHolidayRequest(Long id) {
        holidayRequestRepository.deleteById(id);
        return holidayRequestRepository.findById(id).isEmpty();
    }

    private Boolean doesStatusChanged(String newStatus, String oldStatus) {
        return !newStatus.equals(oldStatus);
    }
}
