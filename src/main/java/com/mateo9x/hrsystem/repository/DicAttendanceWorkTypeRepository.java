package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.DicAttendanceWorkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DicAttendanceWorkTypeRepository extends JpaRepository <DicAttendanceWorkType, Long> {
}
