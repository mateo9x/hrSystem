package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.HolidayRequestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HolidayRequestTypeRepository extends JpaRepository<HolidayRequestType, Long> {
}
