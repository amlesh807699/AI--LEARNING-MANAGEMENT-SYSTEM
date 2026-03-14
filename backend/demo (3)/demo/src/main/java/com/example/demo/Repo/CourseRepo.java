package com.example.demo.Repo;

import com.example.demo.Entity.Course;
import com.example.demo.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course, Long> {


    List<Course> findAllByTeacher(Teacher teacher);
    @Query("""
        SELECT c FROM Course c
        JOIN c.teacher t
        WHERE 
        LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%'))
        OR
        LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    List<Course> searchCourses(@Param("query") String query);
}
