package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.HolidayRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HolidayRequestStatusRepository extends JpaRepository<HolidayRequestStatus, Long> {
}
