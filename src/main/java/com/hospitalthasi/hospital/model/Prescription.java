package com.hospitalthasi.hospital.model;

import jakarta.persistence.*;

@Entity
@Table(name = "prescription")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "prescription_date")
    private String date;

    @Column(name = "doctor")
    private String doctor;

    @Column(name = "drugs")
    private String drugs;

    @Column(name = "note")
    private String note;

    public Prescription() {}

    public Prescription(Long id, String patientName, String date, String doctor, String drugs, String note) {
        this.id = id;
        this.patientName = patientName;
        this.date = date;
        this.doctor = doctor;
        this.drugs = drugs;
        this.note = note;
    }

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getDrugs() { return drugs; }
    public void setDrugs(String drugs) { this.drugs = drugs; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
