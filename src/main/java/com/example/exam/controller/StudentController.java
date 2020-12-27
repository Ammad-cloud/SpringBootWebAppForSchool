package com.example.exam.controller;

import com.example.exam.model.Student;
import com.example.exam.model.Supervisor;
import com.example.exam.service.IStudentService;
import com.example.exam.service.ISupervisorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
public class StudentController {
    IStudentService studentService;
    ISupervisorService supervisorService;

    public StudentController(IStudentService studentService, ISupervisorService supervisorService) {
        this.studentService = studentService;
        this.supervisorService = supervisorService;
    }

    @GetMapping("api/students")
    public ResponseEntity<Set<Student>> getSearchResult(){
        Set<Student> students = studentService.findAll();
        return ResponseEntity.ok(students);
    }

    @PostMapping("api/createStudent")
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        /*for (int i = 0; i < 10; i++) {
            Supervisor supervisor = supervisorService.findById((long) 1).get();
            Student student1 = new Student(0, "lars", "oleLuk", supervisor);
            studentService.save(student1);
        }*/
        studentService.save(student);
        return ResponseEntity.ok(student);
    }

    @DeleteMapping("api/deleteStudent/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable("id") Long id) {
        try{
            studentService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("api/updateStudent/{id}")
    public void updateStudent(@RequestBody Student student, @PathVariable("id") Long id) {
        System.out.println("In controller student is " + student);
            Student tempStudent = studentService.findById(id).get();
            tempStudent.setName(student.getName());
            tempStudent.setEmail(student.getEmail());
            tempStudent.setSupervisor(student.getSupervisor());
            studentService.save(tempStudent);
            System.out.println("I've saved");

    }

}
