package com.example.demo.Repo;

import com.example.demo.Entity.Course;
import com.example.demo.Entity.Enrollment;
import com.example.demo.Entity.EnrollmentStatus;
import com.example.demo.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {


    List<Enrollment> findAllByCourse(Course course);
    List<Enrollment> findByStudent(Student student);

    long countByStudentAndStatus(Student student, EnrollmentStatus status);




    boolean existsByStudentAndCourse(Student student, Course course);

    long countByStudent(Student student);
}


