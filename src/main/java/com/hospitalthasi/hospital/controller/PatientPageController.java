package com.hospitalthasi.hospital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PatientPageController {

    @GetMapping("/patient")
    public String patientPage() {
        return "Category/Patients"; // Sẽ tìm file: src/main/resources/templates/Category/Patients.html
    }
}
