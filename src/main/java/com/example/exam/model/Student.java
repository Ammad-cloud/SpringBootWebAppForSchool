package com.example.exam.model;

import javax.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private String email;
    @ManyToOne
    @JoinColumn(name = "supervisor_id") //Telling JPA this is a Join-column and then it refers to PK of supervisor.
    private Supervisor supervisor;

    public Student() {
    }

    public Student(long id, String name, String email, Supervisor supervisor) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.supervisor = supervisor;
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Supervisor getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", supervisor=" + supervisor +
                '}';
    }
}
