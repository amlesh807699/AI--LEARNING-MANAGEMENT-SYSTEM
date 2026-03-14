package com.example.demo.Controller;

import com.example.demo.Ai.AiService;
import com.example.demo.Entity.*;
import com.example.demo.Service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final AiService aiService;

    @PostMapping("/profile")
    public ResponseEntity<Student> addStudentProfile(
            @RequestBody Student student,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Student saved = studentService.add(student, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    @GetMapping("/profile")
    public ResponseEntity<Student> getStudentProfile(
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Student student = studentService.get(email);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(studentService.all());
    }

    @GetMapping("/profile-exists")
    public ResponseEntity<Boolean> studentProfileExists(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                studentService.profileExists(email)
        );
    }







    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(
            @RequestParam String query,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                studentService.searchCourses(query)
        );
    }



    @GetMapping("/courses/{courseId}")
    public ResponseEntity<Course> getCourseById(
            @PathVariable Long courseId
    ) {
        return ResponseEntity.ok(
                studentService.getCourseById(courseId)
        );
    }


    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<?> enrollCourse(
            @PathVariable Long courseId,
            @RequestBody Enrollment enrollment,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        try {
            Enrollment saved =
                    studentService.doEnroll(courseId, enrollment, email);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(saved);

        } catch (RuntimeException ex) {

            if (ex.getMessage().equals("Already enrolled in this course")) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(ex.getMessage());
            }

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }



    @GetMapping("/my-courses")
    public ResponseEntity<List<Course>> getMyCourses(
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                studentService.getMyCourses(email)
        );
    }


    @GetMapping("/courses/{courseId}/lessons")
    public ResponseEntity<List<Lesson>> getCourseLessons(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                studentService.getCourseLessons(courseId, email)
        );
    }


    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<Lesson> getLesson(
            @PathVariable Long lessonId,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                studentService.getLesson(lessonId, email)
        );
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody Map<String, String> body,
                                       HttpServletRequest request) {

        String email = (String) request.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        String message = body.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Message is required");
        }

        // Direct AI answer
        String reply = aiService.chat(message);
        return ResponseEntity.ok(reply);
    }
}
