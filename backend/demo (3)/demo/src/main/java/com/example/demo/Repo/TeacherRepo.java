package com.example.demo.Repo;

import com.example.demo.Entity.Teacher;
import com.example.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepo extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUserEmail(String email);
}
