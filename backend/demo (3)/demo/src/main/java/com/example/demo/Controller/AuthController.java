package com.example.demo.Controller;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;
import com.example.demo.Security.JwtUtils;
import com.example.demo.Security.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtutils;
    private final JavaMailSender mailSender;

    private int generateOtp() {
        return 100000 + new Random().nextInt(900000);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("ADMIN role cannot be registered");
        }

        if (user.getRole() != Role.TEACHER && user.getRole() != Role.STUDENT) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid role");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setOtp(generateOtp());
        user.setVerified(false);

        userRepo.save(user);
        sendOtpEmail(user.getEmail(), user.getOtp());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registered successfully. Verify email.");
    }




    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String email, @RequestParam int otp) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getVerified()) {
            return ResponseEntity.badRequest().body("Already verified");
        }

        if (user.getOtp() != null && user.getOtp() == otp) {
            user.setVerified(true);
            user.setOtp(null);
            userRepo.save(user);
            return ResponseEntity.ok("Verified successfully");
        }

        return ResponseEntity.badRequest().body("Invalid OTP");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body,
                                   HttpServletResponse response) {

        User user = userRepo.findByEmail(body.get("email"))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email not verified");
        }

        if (!passwordEncoder.matches(body.get("password"), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtutils.generateToken(user.getEmail(), user.getRole().name());

        jakarta.servlet.http.Cookie cookie =
                new jakarta.servlet.http.Cookie("token", token);

        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                Map.of(
                        "email", user.getEmail(),
                        "name", user.getName(),
                        "role", user.getRole().name()
                )
        );
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out");
    }


    private void sendOtpEmail(String to, int otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("OTP Verification");
        msg.setText("Your OTP is: " + otp);
        mailSender.send(msg);
    }
}
