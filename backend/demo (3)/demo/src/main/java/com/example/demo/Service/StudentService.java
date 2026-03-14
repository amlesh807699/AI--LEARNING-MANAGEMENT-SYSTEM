package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final CourseRepo courseRepo;
    private final LessonRepo lessonRepo;
    private final EnrollmentRepo enrollmentRepo;

    public boolean profileExists(String email) {
        return studentRepo.findByUserEmail(email).isPresent();
    }



    public Student add(Student student, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.STUDENT) {
            throw new RuntimeException("Only STUDENT can create student profile");
        }

        student.setUser(user);
        return studentRepo.save(student);
    }


    public Student get(String email) {
        Student student = studentRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        long total = enrollmentRepo.countByStudent(student);
        long completed = enrollmentRepo.countByStudentAndStatus(
                student, EnrollmentStatus.COMPLETED
        );

        student.setTotalEnrolledCourses(Math.toIntExact(total));
        student.setCompletedCourses(Math.toIntExact(completed));

        return student;
    }



    public List<Course> searchCourses(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }
        return courseRepo.searchCourses(query);
    }

    public List<Course> all(){
        return courseRepo.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }


    public Enrollment doEnroll(Long courseId, Enrollment enrollment, String email) {

        Student student = studentRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean alreadyEnrolled =
                enrollmentRepo.existsByStudentAndCourse(student, course);

        if (alreadyEnrolled) {
            throw new RuntimeException("Already enrolled in this course");
        }

        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrolledAt(LocalDateTime.now());

        return enrollmentRepo.save(enrollment);
    }

    public List<Course> getMyCourses(String email) {

        Student student = studentRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return enrollmentRepo.findByStudent(student)
                .stream()
                .map(Enrollment::getCourse)
                .toList();
    }


    public List<Lesson> getCourseLessons(Long courseId, String email) {

        Student student = studentRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean enrolled =
                enrollmentRepo.existsByStudentAndCourse(student, course);

        if (!enrolled) {
            throw new RuntimeException("You are not enrolled in this course");
        }

        return lessonRepo.findByCourseId(courseId);
    }


    public Lesson getLesson(Long lessonId, String email) {

        Student student = studentRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        boolean enrolled =
                enrollmentRepo.existsByStudentAndCourse(student, lesson.getCourse());

        if (!enrolled) {
            throw new RuntimeException("You are not enrolled in this course");
        }

        return lesson;
    }
}
