package com.hospitalthasi.hospital.controller;

import com.hospitalthasi.hospital.model.Patient;
import com.hospitalthasi.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patient")
public class PatientApiController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAll() {
        return patientService.getAll();
    }

    @PostMapping
    public Patient create(@RequestBody Patient patient) {
        return patientService.create(patient);
    }

    // Cập nhật bệnh nhân
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Patient patient) {
        Optional<Patient> existing = patientService.findById(id);
        if (existing.isPresent()) {
            patient.setId(id);
            Patient updated = patientService.update(patient);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa bệnh nhân
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Patient> existing = patientService.findById(id);
        if (existing.isPresent()) {
            patientService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
