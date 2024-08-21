package com.springboot.projetofinalacademiaufnbelezavip.domain.servicos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="cadastros")
public class Cadastro{

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long   id;
    private String nome;
    private String dataNascimento;
    private String cpf;
    private String telefone;
    private String email;
    private String cep;
    private String enderecoCompleto;
    private String cidade;
    private String uf;
    private String bairro;
    private String complemento;
    @JsonIgnore
    @OneToMany(mappedBy = "cadastro", fetch = FetchType.EAGER)
    private List<Agendamento> agendamentos;



    public List<Agendamento> getAgendamentos() {
        return agendamentos;
    }


    public void setAgendamentos(List<Agendamento> agendamentos) {
        this.agendamentos = agendamentos;
    }





}
