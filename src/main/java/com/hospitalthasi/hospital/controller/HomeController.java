package com.hospitalthasi.hospital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "HomePage";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Admin/index";
    }
}
