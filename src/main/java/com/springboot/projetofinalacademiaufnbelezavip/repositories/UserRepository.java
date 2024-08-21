package com.springboot.projetofinalacademiaufnbelezavip.repositories;

import com.springboot.projetofinalacademiaufnbelezavip.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    UserDetails findByLogin(String login);



    boolean existsByLogin(String login);

    Optional<User> findByNome(String nome);


}
