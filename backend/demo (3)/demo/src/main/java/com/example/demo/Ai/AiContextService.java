package com.example.demo.Ai;

import com.example.demo.Repo.CourseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiContextService {

    private final CourseRepo courseRepo;

    public String buildStudentContext() {
        return courseRepo.findAll().stream()
                .map(c -> "Course: " + c.getTitle() +
                        ", Teacher: " + c.getTeacher().getName() +
                        ", Lessons: " + c.getLessons().size())
                .collect(Collectors.joining("\n"));
    }
}

