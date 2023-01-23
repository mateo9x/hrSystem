package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.HolidayRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRequestRepository extends JpaRepository<HolidayRequest, Long> {

    List<HolidayRequest> findAllByUserIdAndDateFromGreaterThanEqualAndDateFromLessThanEqual (Long userId, LocalDate dateFrom, LocalDate dateTo);

    List<HolidayRequest> findAllByDateFromGreaterThanEqualAndDateFromLessThanEqual (LocalDate dateFrom, LocalDate dateTo);

}
