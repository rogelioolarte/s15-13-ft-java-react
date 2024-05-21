package com.stockmaster.controller;

import com.stockmaster.dto.LoginRequestDto;
import com.stockmaster.dto.UserResponseDto;
import com.stockmaster.entity.User;
import com.stockmaster.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userSevice;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequestDto){
        User authenticatedUser = userSevice.login(loginRequestDto);
        if (authenticatedUser != null) {
            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto.setId(String.valueOf(authenticatedUser.getId()));
            userResponseDto.setFirst_name(authenticatedUser.getFirst_name());
            userResponseDto.setLast_name(authenticatedUser.getLast_name());
            userResponseDto.setEmail(authenticatedUser.getEmail());
            return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
