package com.springboot.projetofinalacademiaufnbelezavip.services;

import com.springboot.projetofinalacademiaufnbelezavip.domain.user.User;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }


    public User findById(Long id){
        return repository.findById(id).orElseThrow(null);
    }
    public boolean existsByLogin(String login) {
        return repository.existsByLogin(login);
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }


}
