package com.hospitalthasi.hospital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppointmentController {
    @RequestMapping("/appointment")
    public String appointment() {
        return "Category/Appoinments";
    }

}
