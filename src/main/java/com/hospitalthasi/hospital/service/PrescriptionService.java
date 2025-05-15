package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Prescription;
import java.util.List;
import java.util.Optional;

public interface PrescriptionService {
    List<Prescription> getAll();
    Prescription create(Prescription prescription);
    Optional<Prescription> findById(Long id);
    Prescription update(Prescription prescription);
    void delete(Long id);
}
