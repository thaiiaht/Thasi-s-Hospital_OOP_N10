package com.hospitalthasi.hospital.controller;

import com.hospitalthasi.hospital.model.Prescription;
import com.hospitalthasi.hospital.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionApiController {

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping
    public List<Prescription> getAll() {
        return prescriptionService.getAll();
    }

    @PostMapping
    public Prescription create(@RequestBody Prescription prescription) {
        return prescriptionService.create(prescription);
    }

    @GetMapping("/{id}")
    public Optional<Prescription> getById(@PathVariable Long id) {
        return prescriptionService.findById(id);
    }

    @PutMapping("/{id}")
    public Prescription update(@PathVariable Long id, @RequestBody Prescription prescription) {
        prescription.setId(id);
        return prescriptionService.update(prescription);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        prescriptionService.delete(id);
    }
}
