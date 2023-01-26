package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.AnnotationForUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnotationForUserRepository extends JpaRepository<AnnotationForUser, Long> {
}
