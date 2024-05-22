package com.stockmaster.service;

import com.stockmaster.dto.LoginRequestDto;
import com.stockmaster.entity.User;
import com.stockmaster.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(LoginRequestDto loginRequestDto) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequestDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(loginRequestDto.getPassword())) {
                return user;
            }
        }
        return null;
    }
}
