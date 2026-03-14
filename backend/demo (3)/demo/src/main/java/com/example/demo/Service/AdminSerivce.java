package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminSerivce {
    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final CourseRepo courseRepo;
    private final LessonRepo lessonRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final TeacherRepo teacherRepo;


    public List<Teacher> allteacher(){
        return teacherRepo.findAll();
    }

    public List<Course> allcourse(){
        return courseRepo.findAll();
    }

    public List<Lesson> alllesson(){
        return lessonRepo.findAll();
    }

    public List<Student> allstudent(){
        return studentRepo.findAll();
    }

    public List<Enrollment> allenrollment(){
        return enrollmentRepo.findAll();
    }

    public List<User> alluser(){
        return userRepo.findAll();
    }

    public void delete(Long id){
        userRepo.deleteById(id);
    }



}
