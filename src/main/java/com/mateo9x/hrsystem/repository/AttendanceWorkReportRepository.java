package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.AttendanceWorkReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceWorkReportRepository extends JpaRepository<AttendanceWorkReport, Long> {

    Optional<AttendanceWorkReport> findAttendanceWorkReportByUserIdAndDate(Long userId, LocalDate date);

    List<AttendanceWorkReport> findAllAttendanceWorkReportByDate(LocalDate date);

    List<AttendanceWorkReport> findAllByUserIdAndDateGreaterThanEqualAndDateLessThanEqual(Long userId, LocalDate dateFrom, LocalDate dateTo);
}
