package com.ldtech.Authentication;

import com.ldtech.dtos.LoginDto;
import com.ldtech.dtos.SignUpDto;
import com.ldtech.entities.Role;
import com.ldtech.entities.User;
import com.ldtech.repositories.RoleRepository;
import com.ldtech.repositories.UserRepository;
import com.ldtech.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // API for login
    @PostMapping("/logIn")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
        // Authenticate the user
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUserEmail(), loginDto.getPassword())
        );

        // Set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(authenticate.getName());

//        return new ResponseEntity<>("User Signed in successfully!!", HttpStatus.OK);

        // Return the token
        return ResponseEntity.ok(token);
    }

    // API for signup
    @PostMapping("/signUp")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDto signUpDto) {
        // Check if the email exists in the database
        boolean emailExists = userRepository.existsByCompanyEmail(signUpDto.getUserEmail());
        if (emailExists) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email is already taken!!!");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(signUpDto.getPassword());

        // Create a new user with the provided details
        User user = new User();
        user.setCompanyEmail(signUpDto.getUserEmail());
        user.setPassword(encodedPassword);

        // Assign ROLE_ADMIN to the user
        Role roleAdmin = roleRepository.findByRoleName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Collections.singleton(roleAdmin));

        // Save the new user
        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("User registered successfully!!!");
    }

}
