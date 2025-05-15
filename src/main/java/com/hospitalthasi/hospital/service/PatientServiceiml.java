package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Patient;
import com.hospitalthasi.hospital.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceiml implements PatientService{
    @Autowired
    private PatientRepo patientRepo;

    @Override
    public List<Patient> getAll() {
        return patientRepo.findAll();
    }

    @Override
    public Patient create(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public Optional<Patient> findById(Long id) {
        return patientRepo.findById(id);
    }

    @Override
    public Patient update(Patient patient) {
        // Kiểm tra tồn tại trước khi update (bạn có thể tùy chỉnh thêm)
        Optional<Patient> existing = patientRepo.findById(patient.getId());
        if (existing.isPresent()) {
            return patientRepo.save(patient);
        } else {
            return null; // hoặc ném exception tùy cách xử lý của bạn
        }
    }

    @Override
    public void delete(Long id) {
        patientRepo.deleteById(id);
    }
}
