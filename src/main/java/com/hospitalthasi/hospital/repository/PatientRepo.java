package com.hospitalthasi.hospital.repository;

import com.hospitalthasi.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepo extends JpaRepository<Patient, Long> {

}
