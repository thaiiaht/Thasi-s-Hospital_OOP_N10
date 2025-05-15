package com.hospitalthasi.hospital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PrescriptionsController {
    @RequestMapping("/prescription")
    public String prescriptions(){
        return "Category/Prescriptions";
    }

}
