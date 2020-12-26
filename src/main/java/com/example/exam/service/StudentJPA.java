package com.example.exam.service;

import com.example.exam.model.Student;
import com.example.exam.repository.IStudentRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class StudentJPA implements IStudentService{
    private final IStudentRepository studentRepository;

    public StudentJPA(IStudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Set<Student> findAll() {
        Set<Student> set = new HashSet<>();
        studentRepository.findAll().forEach(set::add);
        return set;
    }

    @Override
    public Student save(Student object) {
        return studentRepository.save(object);
    }

    @Override
    public void delete(Student object) {
        studentRepository.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        studentRepository.deleteById(aLong);

    }

    @Override
    public Optional<Student> findById(Long aLong) {
        return studentRepository.findById(aLong);
    }
}
