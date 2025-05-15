package com.hospitalthasi.hospital.model;

import jakarta.persistence.*;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String firstName;

    @Column(name = "Date")
    private String date;

    @Column(name = "gender")
    private String gender;

    @Column(name = "phone")
    private String phone;

    public Patient() {}

    public Patient(String firstName, long id, String date, String gender, String phone) {
        this.firstName = firstName;
        this.id = id;
        this.date = date;
        this.gender = gender;
        this.phone = phone;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
}
