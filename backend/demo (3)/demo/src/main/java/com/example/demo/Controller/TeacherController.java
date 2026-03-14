package com.example.demo.Controller;

import com.example.demo.Entity.*;
import com.example.demo.Service.TeacherService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class TeacherController {

    private final TeacherService teacherService;


    @PostMapping("/profile")
    public ResponseEntity<Teacher> addTeacher(
            @Valid @RequestBody Teacher teacher,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");
        return ResponseEntity.ok(
                teacherService.addTeacher(email, teacher)
        );
    }

    @GetMapping("/profile")
    public ResponseEntity<Teacher> getProfile(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(403).build();
        }

        Teacher teacher = teacherService.get(email);

        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(teacher);
    }

    @PutMapping("/profile")
    public ResponseEntity<Teacher> updateTeacher(
            @Valid @RequestBody Teacher teacher,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");
        return ResponseEntity.ok(
                teacherService.updateTeacher(email, teacher)
        );
    }
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getMyCourses(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        List<Course> courses = teacherService.getCourses(email);

        return ResponseEntity.ok(courses);
    }



    @PostMapping("/course")
    public ResponseEntity<Course> addCourse(
            @Valid @RequestBody Course course,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");
        return ResponseEntity.ok(
                teacherService.addCourse(email, course)
        );
    }



    @DeleteMapping("/course/{courseId}")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");
        teacherService.deleteCourse(courseId, email);
        return ResponseEntity.ok("Course deleted successfully");
    }


    @PostMapping(
            value = "/course/{courseId}/lesson",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Lesson> addLesson(
            @PathVariable Long courseId,
            @RequestPart("lesson") String lessonJson,
            @RequestPart(value = "video", required = false) MultipartFile video,
            HttpServletRequest request
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        Lesson lesson = mapper.readValue(lessonJson, Lesson.class);

        String email = (String) request.getAttribute("email");

        return ResponseEntity.ok(
                teacherService.addLesson(courseId, lesson, video, email)
        );
    }



    @GetMapping("/course/{courseId}/enrollments")
    public ResponseEntity<List<Enrollment>> getEnrollments(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");
        return ResponseEntity.ok(
                teacherService.getEnrollments(courseId, email)
        );
    }

    @GetMapping("/profile-exists")
    public ResponseEntity<Boolean> teacherProfileExists(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(
                teacherService.profileExists(email)
        );
    }



    @GetMapping("/course/{courseId}/lessons")
    public ResponseEntity<List<Lesson>> getLessons(
            @PathVariable Long courseId,
            HttpServletRequest request
    ) {
        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Lesson> lessons = teacherService.getLessons(courseId, email);
        return ResponseEntity.ok(lessons);
    }





}
