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
    public boolean login(LoginRequestDto loginRequestDto) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequestDto.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getPassword().equals(loginRequestDto.getPassword());
        }
        return false;
    }
}
