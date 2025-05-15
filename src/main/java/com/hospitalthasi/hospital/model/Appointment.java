package com.hospitalthasi.hospital.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "date")
    private String date;

    @Column(name = "time")
    private String time;

    @Column(name = "doctor")
    private String doctor;

    @Column(name = "note")
    private String note;

    // Constructors
    public Appointment() {}

    public Appointment(Long id, String patientName, String date, String time, String doctor, String note) {
        this.id = id;
        this.patientName = patientName;
        this.date = date;
        this.time = time;
        this.doctor = doctor;
        this.note = note;
    }

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
