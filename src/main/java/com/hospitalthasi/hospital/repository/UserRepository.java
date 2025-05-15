package com.hospitalthasi.hospital.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hospitalthasi.hospital.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    void deleteByUsername(String username);
}
