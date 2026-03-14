package com.example.demo.Service;

import com.example.demo.Cloud.CloudinaryService;
import com.example.demo.Entity.*;
import com.example.demo.Repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private static final Logger log = LoggerFactory.getLogger(TeacherService.class);
    private final UserRepo userRepo;
    private final TeacherRepo teacherRepo;
    private final CourseRepo courseRepo;
    private final LessonRepo lessonRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final CloudinaryService cloudinaryService;

    public Teacher get(String email) {
        return teacherRepo.findByUserEmail(email).orElse(null);
    }

    public boolean profileExists(String email) {
        return teacherRepo.findByUserEmail(email).isPresent();
    }

    public Teacher add(Teacher teacher, String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        teacher.setUser(user);
        return teacherRepo.save(teacher);
    }

    public Teacher addTeacher(String email, Teacher teacher) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + email)
                );

        teacher.setUser(user);
        teacher.setName(user.getName());

        return teacherRepo.save(teacher);
    }


    public Teacher updateTeacher(String email, Teacher updatedTeacher) {

        Teacher teacher = teacherRepo.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Teacher profile not found")
                );

        teacher.setName(updatedTeacher.getName());
        teacher.setDescription(updatedTeacher.getDescription());
        teacher.setExperience(updatedTeacher.getExperience());
        teacher.setEducation(updatedTeacher.getEducation());

        return teacherRepo.save(teacher);
    }




    public Course addCourse(String email, Course course) {

        Teacher teacher = teacherRepo.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found")
                );
        teacher.setTotalCourses(teacher.getTotalCourses() + 1);

        course.setTeacher(teacher);
        return courseRepo.save(course);
    }

    public List<Course> getCourses(String email) {
        Teacher teacher=teacherRepo.findByUserEmail(email).orElseThrow(null);
        return courseRepo.findAllByTeacher(teacher);
    }




    public Lesson addLesson(
            Long courseId,
            Lesson lesson,
            MultipartFile video,
            String email
    ) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getTeacher().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        if (video != null && !video.isEmpty()) {
            String videoUrl = cloudinaryService.uploadVideo(video);
            lesson.setVideoUrl(videoUrl);
        }

        lesson.setCourse(course);
        return lessonRepo.save(lesson);
    }



    public void deleteCourse(Long courseId, String email) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found")
                );

        if (!course.getTeacher().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to delete this course");
        }

        courseRepo.delete(course);
    }

    public List<Lesson> getLessons(Long courseId, String email) {

        log.info("getLessons called");
        log.info("courseId = {}", courseId);
        log.info(" email from request = {}", email);

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        log.info(" Course found: id={}, title={}", course.getId(), course.getTitle());
        log.info(" Course teacher email={}", course.getTeacher().getUser().getEmail());

        if (!course.getTeacher().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        List<Lesson> lessons = lessonRepo.findAllByCourse(course);


        log.info(" Lessons fetched from DB = {}", lessons.size());

        for (Lesson l : lessons) {
            log.info(" Lesson -> id={}, title={}, courseId={}",
                    l.getId(), l.getTitle(), l.getCourse().getId());
        }

        return lessons;
    }




    public Lesson addLesson(Long courseId, Lesson lesson, String email) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found")
                );

        if (!course.getTeacher().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to add lesson");
        }

        lesson.setCourse(course);
        return lessonRepo.save(lesson);
    }


    public List<Enrollment> getEnrollments(Long courseId, String email) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found")
                );

        if (!course.getTeacher().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        return enrollmentRepo.findAllByCourse(course);
    }

    public Course getCourse(String email) {
        Teacher teacher = teacherRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        return courseRepo.findAllByTeacher(teacher)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No course found"));
    }

}
