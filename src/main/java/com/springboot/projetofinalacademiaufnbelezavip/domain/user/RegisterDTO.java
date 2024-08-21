package com.springboot.projetofinalacademiaufnbelezavip.domain.user;

public record RegisterDTO(Long id, String nome, String login, String password,  UserRole role) {
}
