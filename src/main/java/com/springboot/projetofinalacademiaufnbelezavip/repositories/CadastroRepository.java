package com.springboot.projetofinalacademiaufnbelezavip.repositories;

import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Cadastro;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CadastroRepository extends JpaRepository<Cadastro, Long> {
    Optional<Cadastro> findById(Long id);


    List<Cadastro> findByCpf(String cpf);


}
