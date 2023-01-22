package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.HolidayRequest;
import com.mateo9x.hrsystem.dto.HolidayRequestDTO;
import com.mateo9x.hrsystem.mapper.HolidayRequestMapper;
import com.mateo9x.hrsystem.repository.HolidayRequestRepository;
import com.mateo9x.hrsystem.service.HolidayRequestService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Slf4j
public class HolidayRequestServiceImpl implements HolidayRequestService {

    private final HolidayRequestRepository holidayRequestRepository;
    private final HolidayRequestMapper holidayRequestMapper;

    @Override
    public List<HolidayRequestDTO> getAllHolidayRequestsForUserBetweenSelectedDates(Long userId, LocalDate dateFrom, LocalDate dateTo) {
        log.info("Request to get all holiday request for user: {} between dates: {} - {}", userId, dateFrom, dateTo);
        return holidayRequestRepository.findAllByUserIdAndDateFromGreaterThanEqualAndDateFromLessThanEqual(userId, dateFrom, dateTo)
                .stream()
                .map(holidayRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HolidayRequestDTO saveHolidayRequest(HolidayRequestDTO holidayRequestDTO) {
        log.info("Request to save holiday request: {}", holidayRequestDTO);
        HolidayRequest holidayRequest = holidayRequestMapper.toEntity(holidayRequestDTO);
        holidayRequestRepository.save(holidayRequest);
        return holidayRequestMapper.toDTO(holidayRequest);
    }

    @Override
    public Boolean deleteHolidayRequest(Long id) {
        log.info("Request to delete holiday request by id: {}", id);
        holidayRequestRepository.deleteById(id);
        return holidayRequestRepository.findById(id).isEmpty();
    }
}
