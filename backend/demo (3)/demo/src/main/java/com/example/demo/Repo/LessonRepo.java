package com.example.demo.Repo;

import com.example.demo.Entity.Course;
import com.example.demo.Entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LessonRepo extends JpaRepository<Lesson, Long> {
    List<Lesson> findAllByCourse(Course course);
    @Query("SELECT l FROM Lesson l WHERE l.course.id = :courseId")
    List<Lesson> findByCourseId(Long courseId);
}

