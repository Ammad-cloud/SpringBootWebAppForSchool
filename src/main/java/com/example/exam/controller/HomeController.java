package com.example.exam.controller;

import com.example.exam.service.IStudentService;
import com.example.exam.service.ISupervisorService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
    private IStudentService studentService;
    private ISupervisorService supervisorService;

    public HomeController(IStudentService studentService, ISupervisorService supervisorService) {
        this.studentService = studentService;
        this.supervisorService = supervisorService;
    }

    @GetMapping
    public String index(Model model){
        model.addAttribute("supervisorList", supervisorService.findAll());
        return "index";
    }
}
