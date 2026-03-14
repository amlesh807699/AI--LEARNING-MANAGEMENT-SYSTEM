package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link with User (ROLE_STUDENT)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User must be linked with student profile")
    private User user;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Education is required")
    private String education;

    @NotBlank(message = "Course interest is required")
    private String interests; // Java, Spring, AI

    @Min(value = 0, message = "Total courses cannot be negative")
    private Integer totalEnrolledCourses = 0;

    @Min(value = 0, message = "Completed courses cannot be negative")
    private Integer completedCourses = 0;
}
