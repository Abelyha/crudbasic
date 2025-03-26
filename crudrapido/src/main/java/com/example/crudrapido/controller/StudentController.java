package com.example.crudrapido.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.example.crudrapido.entity.Student;
import com.example.crudrapido.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path = "api/v1/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAll(){
        return studentService.getStudents();
    }

    @GetMapping("/{studentId}")
    public Optional<Student> getById(@PathVariable("studentId") Long studentId){
        return studentService.getStudent(studentId);
    }

    @PostMapping
    public Student saveUpdate(@RequestBody Student student){
        studentService.saveOrUpdate(student);
        return student;
    }

    @DeleteMapping("/{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.delete(studentId);
    }
}
