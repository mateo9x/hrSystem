package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.AttendanceWorkDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceWorkDayRepository extends JpaRepository<AttendanceWorkDay, Long> {

    @Query(value = "select awd from AttendanceWorkDay awd join AttendanceWorkReport awr on awd.attendanceWorkReport.id = awr.id join User u on awr.user.id = u.id where u.id = :userId and (awr.date >= :dateFrom and awr.date <= :dateTo)")
    List<AttendanceWorkDay> findAllForUserBetweenSelectedDates(@Param("userId") Long userId, @Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    @Query(value = "select awd from AttendanceWorkDay awd join AttendanceWorkReport awr on awd.attendanceWorkReport.id = awr.id where awr.id = :attendanceWorkReportId")
    List<AttendanceWorkDay> findAllByAttendanceWorkReportId(@Param("attendanceWorkReportId") Long attendanceWorkReportId);
}
