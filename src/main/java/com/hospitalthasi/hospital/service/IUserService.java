package com.hospitalthasi.hospital.service;

import java.util.List;
import java.util.Optional;

import com.hospitalthasi.hospital.model.User;

public interface IUserService {
    List<User> getAllUsers();
    Optional<User> getUserByUsername(String username);
    User saveUser(User user);
    void deleteUserByUsername(String username);
}
