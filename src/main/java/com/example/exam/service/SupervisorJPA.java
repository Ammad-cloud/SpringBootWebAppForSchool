package com.example.exam.service;

import com.example.exam.model.Supervisor;
import com.example.exam.repository.ISupervisorRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class SupervisorJPA implements ISupervisorService{

    private final ISupervisorRepository supervisorRepository;

    public SupervisorJPA(ISupervisorRepository supervisorRepository) {
        this.supervisorRepository = supervisorRepository;
    }

    @Override
    public Set<Supervisor> findAll() {
        Set<Supervisor> set = new HashSet<>();
        supervisorRepository.findAll().forEach(set::add);
        return set;
    }

    @Override
    public Supervisor save(Supervisor object) {
        return supervisorRepository.save(object);
    }

    @Override
    public void delete(Supervisor object) {
        supervisorRepository.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        supervisorRepository.deleteById(aLong);
    }

    @Override
    public Optional<Supervisor> findById(Long aLong) {
        return supervisorRepository.findById(aLong);
    }
}
