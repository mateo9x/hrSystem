package com.mateo9x.hrsystem.service.impl;

import com.mateo9x.hrsystem.domain.AnnotationForUser;
import com.mateo9x.hrsystem.domain.User;
import com.mateo9x.hrsystem.dto.AnnotationForUserDTO;
import com.mateo9x.hrsystem.dto.AnnotationForUserRequestDTO;
import com.mateo9x.hrsystem.mapper.AnnotationForUserMapper;
import com.mateo9x.hrsystem.repository.AnnotationForUserRepository;
import com.mateo9x.hrsystem.repository.UserRepository;
import com.mateo9x.hrsystem.service.AnnotationForUserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnnotationForUserServiceImpl implements AnnotationForUserService {

    private final AnnotationForUserRepository annotationForUserRepository;
    private final AnnotationForUserMapper annotationForUserMapper;
    private final UserRepository userRepository;

    @Override
    public List<AnnotationForUserDTO> saveAnnotationsForUser(AnnotationForUserRequestDTO annotationForUserRequestDTO) {
        List<AnnotationForUserDTO> savedAnnotations = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(annotationForUserRequestDTO.getUserIds())) {
            annotationForUserRequestDTO.getUserIds().forEach(userId -> savedAnnotations.add(saveAnnotationForUser(userId, annotationForUserRequestDTO)));
            return savedAnnotations;
        }
        return savedAnnotations;
    }

    @Override
    public List<AnnotationForUserDTO> getAnnotationsForUser(Long id) {
        return annotationForUserRepository.getAllByUserId(id).stream()
                .map(annotationForUserMapper::toDTO)
                .sorted(Comparator.comparing(AnnotationForUserDTO::getCreateDate).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Boolean updateAnnotationsReadedValues(List<Long> ids) {
        AtomicReference<Boolean> result = new AtomicReference<>(false);
        ids.forEach(id -> result.set(updateAnnotationReadedValue(id)));
        return result.get();
    }

    private Boolean updateAnnotationReadedValue(Long id) {
        AnnotationForUser annotation = annotationForUserRepository.findById(id).orElse(null);
        if (annotation == null) {
            return false;
        }
        annotation.setReaded(!annotation.getReaded());
        annotationForUserRepository.save(annotation);
        return true;
    }

    @Override
    public Boolean deleteAnnotationById(Long id) {
        annotationForUserRepository.deleteById(id);
        return annotationForUserRepository.findById(id).isEmpty();
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
