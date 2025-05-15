package com.hospitalthasi.hospital.service;

import com.hospitalthasi.hospital.model.Appointment;
import com.hospitalthasi.hospital.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Override
    public List<Appointment> getAll() {
        return appointmentRepo.findAll();
    }

    @Override
    public Appointment create(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    @Override
    public Optional<Appointment> findById(Long id) {
        return appointmentRepo.findById(id);
    }

    @Override
    public Appointment update(Appointment appointment) {
        Optional<Appointment> existing = appointmentRepo.findById(appointment.getId());
        if (existing.isPresent()) {
            return appointmentRepo.save(appointment);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        appointmentRepo.deleteById(id);
    }
}
