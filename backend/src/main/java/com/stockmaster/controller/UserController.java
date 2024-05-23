package com.stockmaster.controller;

import com.stockmaster.dto.user.LoginRequestDTO;
import com.stockmaster.dto.user.UserResponseDTO;
import com.stockmaster.entity.User;
import com.stockmaster.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userSevice;
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequestDTO loginRequestDto) {
        User authenticatedUser = userSevice.login(loginRequestDto);
        if (authenticatedUser != null) {
            UserResponseDTO userResponseDto = new UserResponseDTO();
            userResponseDto.setId(String.valueOf(authenticatedUser.getId()));
            userResponseDto.setFirst_name(authenticatedUser.getFirstName());
            userResponseDto.setLast_name(authenticatedUser.getLastName());
            userResponseDto.setEmail(authenticatedUser.getEmail());
            return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
        }
        throw new RuntimeException();
    }
}
