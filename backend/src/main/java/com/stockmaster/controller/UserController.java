package com.stockmaster.controller;

import com.stockmaster.dto.user.LoginRequestDto;
import com.stockmaster.dto.user.UserResponseDto;
import com.stockmaster.entity.User;
import com.stockmaster.service.user.UserService;
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
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequestDto){
        User authenticatedUser = userSevice.login(loginRequestDto);
        if (authenticatedUser != null) {
            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto.setId(String.valueOf(authenticatedUser.getId()));
            userResponseDto.setFirst_name(authenticatedUser.getFirstName());
            userResponseDto.setLast_name(authenticatedUser.getLastName());
            userResponseDto.setEmail(authenticatedUser.getEmail());
            return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
