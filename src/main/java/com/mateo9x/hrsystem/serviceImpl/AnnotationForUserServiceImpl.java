package com.mateo9x.hrsystem.serviceImpl;

import com.mateo9x.hrsystem.domain.AnnotationForUser;
import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;
import com.mateo9x.hrsystem.mapper.AnnotationForUserMapper;
import com.mateo9x.hrsystem.repository.AnnotationForUserRepository;
import com.mateo9x.hrsystem.repository.UserRepository;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class AnnotationForUserServiceImpl implements AnnotationForUserService {

    private final AnnotationForUserRepository annotationForUserRepository;
    private final AnnotationForUserMapper annotationForUserMapper;
    private final UserRepository userRepository;

    @Override
    public List<AnnotationForUserDTO> saveAnnotationsForUser(AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        log.info("Request to save annotations for users with message: {}", annotationForUserRequestDTO.getMessage());
        List<AnnotationForUserDTO> savedAnnotations = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(annotationForUserRequestDTO.getUserIds())) {
            annotationForUserRequestDTO.getUserIds().forEach(userId -> savedAnnotations.add(saveAnnotationForUser(userId, annotationForUserRequestDTO)));
            return savedAnnotations;
        }
        return savedAnnotations;
    }

    private AnnotationForUserDTO saveAnnotationForUser(Long userId, AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }
        AnnotationForUser annotationForUser = annotationForUserRepository.save(prepareAnnotationModelToSave(user, annotationForUserRequestDTO));
        return annotationForUserMapper.toDTO(annotationForUser);
    }

    private AnnotationForUser prepareAnnotationModelToSave(User user, AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        return AnnotationForUser.builder()
                .user(user)
                .message(annotationForUserRequestDTO.getMessage())
                .createDate(annotationForUserRequestDTO.getCreateDate())
                .readed(false)
                .build();
    }
}
