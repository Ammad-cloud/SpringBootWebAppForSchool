package com.example.exam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Supervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @JsonIgnore // https://stackoverflow.com/questions/47693110/could-not-write-json-infinite-recursion-stackoverflowerror-nested-exception
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "supervisor")
    private Set<Student> students; //added after deadline

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return "Supervisor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
