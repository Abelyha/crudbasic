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
        System.out.println("GET /api/v1/students - Obteniendo todos los estudiantes");
        List<Student> students = studentService.getStudents();
        System.out.println("Número de estudiantes encontrados: " + students.size());
        if (students.size() > 0) {
            System.out.println("Primer estudiante: " + students.get(0).toString());
        }
        return students;
    }

    @GetMapping("/{studentId}")
    public Optional<Student> getById(@PathVariable("studentId") Long studentId){
        System.out.println("GET /api/v1/students/" + studentId + " - Obteniendo estudiante por ID");
        return studentService.getStudent(studentId);
    }

    @PostMapping
    public Student saveStudent(@RequestBody Student student){
        System.out.println("POST /api/v1/students - Guardando nuevo estudiante: " + student);
        // Para asegurar que es un nuevo estudiante
        student.setStundentId(null);
        studentService.saveOrUpdate(student);
        System.out.println("Estudiante guardado con ID: " + student.getStundentId());
        return student;
    }

    @PutMapping("/{studentId}")
    public Student updateStudent(@PathVariable("studentId") Long studentId, @RequestBody Student student){
        System.out.println("PUT /api/v1/students/" + studentId + " - Actualizando estudiante: " + student);
        
        // Asegurarse de que el ID en la URL coincide con el ID del estudiante
        student.setStundentId(studentId);
        studentService.saveOrUpdate(student);
        
        System.out.println("Estudiante actualizado: " + student);
        return student;
    }

    @DeleteMapping("/{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        System.out.println("DELETE /api/v1/students/" + studentId + " - Eliminando estudiante");
        studentService.delete(studentId);
    }
}
