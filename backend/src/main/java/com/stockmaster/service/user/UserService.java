package com.stockmaster.service.user;

import com.stockmaster.dto.user.LoginRequestDTO;
import com.stockmaster.entity.User;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User login(LoginRequestDTO loginRequestDto) {

        Optional<User> optionalUser = userRepository.findByEmail(loginRequestDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(loginRequestDto.getPassword())) {
                return user;
            }
            else{
                throw  new RequestException("Invalid credentials. Wrong Password!");
            }
        }
        throw  new RequestException("Invalid credentials. Incorrect Email!");
    }

}
