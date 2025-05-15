package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Appointment;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    List<Appointment> getAll();
    Appointment create(Appointment appointment);
    Optional<Appointment> findById(Long id);
    Appointment update(Appointment appointment);
    void delete(Long id);
}
