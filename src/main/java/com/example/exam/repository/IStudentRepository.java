package com.example.exam.repository;

import com.example.exam.model.Student;
import org.springframework.data.repository.CrudRepository;

public interface IStudentRepository extends CrudRepository<Student, Long> {
}
