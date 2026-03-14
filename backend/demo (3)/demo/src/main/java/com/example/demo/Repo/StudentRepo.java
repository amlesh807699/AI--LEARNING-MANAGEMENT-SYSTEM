package com.example.demo.Repo;

import com.example.demo.Entity.Student;
import com.example.demo.Entity.Teacher;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Long> {
    Optional<Student> findByUserEmail(String email);
}
