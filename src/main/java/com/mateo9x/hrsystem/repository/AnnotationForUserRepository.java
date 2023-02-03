package com.mateo9x.hrsystem.repository;

import com.mateo9x.hrsystem.domain.AnnotationForUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnotationForUserRepository extends JpaRepository<AnnotationForUser, Long> {

    List<AnnotationForUser> getAllByUserId(Long userId);
}
