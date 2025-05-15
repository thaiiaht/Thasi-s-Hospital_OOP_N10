package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientService {
    List<Patient> getAll();
    Patient create(Patient patient);
    Optional<Patient> findById(Long id);
    Patient update(Patient patient);
    void delete(Long id);

}
