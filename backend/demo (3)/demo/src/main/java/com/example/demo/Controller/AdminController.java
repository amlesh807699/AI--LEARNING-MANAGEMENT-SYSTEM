package com.example.demo.Controller;

import com.example.demo.Entity.Course;
import com.example.demo.Entity.Student;
import com.example.demo.Entity.Teacher;
import com.example.demo.Entity.User;
import com.example.demo.Service.AdminSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminSerivce adminSerivce;

    @GetMapping("/get/user")
    ResponseEntity<List<User>> getUser(){
      return ResponseEntity.ok(adminSerivce.alluser());
    }

    @GetMapping("/get/teacher")
    ResponseEntity<List<Teacher>> gettacher(){
        return ResponseEntity.ok(adminSerivce.allteacher());
    }

    @GetMapping("/get/course")
    ResponseEntity<List<Course>> getcourse (){
        return ResponseEntity.ok(adminSerivce.allcourse());
    }

    @GetMapping("/get/students")
    ResponseEntity<List<Student>> getstudents (){
        return ResponseEntity.ok(adminSerivce.allstudent());
    }


}
