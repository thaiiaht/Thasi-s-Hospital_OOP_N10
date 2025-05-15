package com.hospitalthasi.hospital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hospitalthasi.hospital.model.User;
import com.hospitalthasi.hospital.service.IUserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private IUserService userService;

    @RequestMapping("")
    public String admin() {
        return "Admin/index";
    }

    // Lấy danh sách tất cả người dùng (User)
    // Khi gọi GET /admin/api/users, phương thức này trả về danh sách tất cả user dưới dạng JSON.
    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // Lấy thông tin người dùng theo username
    // Khi gọi GET /admin/api/users/{username}, trả về thông tin user có username tương ứng (nếu có).
    @GetMapping("/api/users/{username}")
    @ResponseBody
    public ResponseEntity<User> getByUsername(@PathVariable String username) {
        Optional<User> userOpt = userService.getUserByUsername(username);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Tạo mới một người dùng
    // Khi gọi POST /admin/api/users với dữ liệu user trong body, phương thức này sẽ lưu user mới và trả về user đó.
    @PostMapping("/api/users")
    @ResponseBody
    public User create(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Cập nhật thông tin người dùng theo username
    // Khi gọi PUT /admin/api/users/{username} với dữ liệu user trong body, phương thức này sẽ cập nhật user có username tương ứng.
    @PutMapping("/api/users/{username}")
    @ResponseBody
    public User update(@PathVariable String username, @RequestBody User user) {
        user.setUsername(username);
        return userService.saveUser(user);
    }

    // Xóa người dùng theo id
    // Khi gọi DELETE /admin/api/users/{id}, phương thức này sẽ xóa user có id tương ứng.
    @DeleteMapping("/api/users/{id}")
    @ResponseBody
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        return ResponseEntity.noContent().build();
    }
}
