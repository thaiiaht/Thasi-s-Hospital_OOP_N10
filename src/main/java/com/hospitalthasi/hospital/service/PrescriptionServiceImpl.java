package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Prescription;
import com.hospitalthasi.hospital.repository.PrescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepo prescriptionRepo;

    @Override
    public List<Prescription> getAll() {
        return prescriptionRepo.findAll();
    }

    @Override
    public Prescription create(Prescription prescription) {
        return prescriptionRepo.save(prescription);
    }

    @Override
    public Optional<Prescription> findById(Long id) {
        return prescriptionRepo.findById(id);
    }

    @Override
    public Prescription update(Prescription prescription) {
        Optional<Prescription> existing = prescriptionRepo.findById(prescription.getId());
        if (existing.isPresent()) {
            return prescriptionRepo.save(prescription);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        prescriptionRepo.deleteById(id);
    }
}
