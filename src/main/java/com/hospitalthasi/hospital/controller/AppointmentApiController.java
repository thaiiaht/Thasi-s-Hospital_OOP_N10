package com.hospitalthasi.hospital.controller;

import com.hospitalthasi.hospital.model.Appointment;
import com.hospitalthasi.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentApiController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAll() {
        return appointmentService.getAll();
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {
        return appointmentService.create(appointment);
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getById(@PathVariable Long id) {
        return appointmentService.findById(id);
    }

    @PutMapping("/{id}")
    public Appointment update(@PathVariable Long id, @RequestBody Appointment appointment) {
        appointment.setId(id);
        return appointmentService.update(appointment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        appointmentService.delete(id);
    }
}
