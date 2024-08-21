package com.springboot.projetofinalacademiaufnbelezavip.services;

import java.util.*;

import java.util.stream.Collectors;


import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Agendamento;
import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Cadastro;
import com.springboot.projetofinalacademiaufnbelezavip.domain.user.User;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.AgendamentoRepository;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.CadastroRepository;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


@Service
public class AgendamentoService {

    private static final Logger logger = LoggerFactory.getLogger(AgendamentoService.class);

    @Autowired
    private final AgendamentoRepository agendamentoRepository;
    @Autowired
    private final UserRepository repository;
    @Autowired
    private final CadastroRepository cadastroRepository;


    public AgendamentoService(AgendamentoRepository agendamentoRepository,UserRepository repository,
                              CadastroRepository cadastroRepository ) {
        this.agendamentoRepository = agendamentoRepository;
        this.repository = repository;
        this.cadastroRepository = cadastroRepository;

    }



    @Transactional
    public List<Map<String, Object>> getAllAgendamentos() {
        logger.info("Iniciando busca de todos os agendamentos.");
        List<Agendamento> agendamentos = agendamentoRepository.findAllWithJoinFetch();
        logger.info("Total de agendamentos encontrados: {}", agendamentos.size());
        return agendamentos.stream()
                .map(Agendamento::toJSON)
                .collect(Collectors.toList());
    }

    public List<Agendamento> buscarAgendamentosPorCpf(String cpf) {
        return agendamentoRepository.findByCpf(cpf);
    }
    public Agendamento getAgendamentoById(Long id) {
        Optional<Agendamento> optionalAgendamento = (Optional<Agendamento>) agendamentoRepository.findById(id);
        return optionalAgendamento.orElse(null);
    }
    public Agendamento updateAgendamento(Long id, Agendamento agendamento) {
        if (agendamentoRepository.existsById(id)) {
            agendamento.setId(id);
            return agendamentoRepository.save(agendamento);
        } else {
            throw new EntityNotFoundException("Agendamento não encontrado com ID: " + id);

        }
    }


    @Transactional  //verifica o cpf  no cadastro e o nome em user, para poder relacionar os ids em agendamentos.
    public Agendamento createAgendamento(Agendamento novoAgendamento) {
        try {
            List<Cadastro> cadastros = cadastroRepository.findByCpf(novoAgendamento.getCpf());
            Cadastro cadastro = cadastros.stream().findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Nenhum cadastro encontrado com o CPF: " + novoAgendamento.getCpf()));

            Optional<User> optionalUser = repository.findByNome(novoAgendamento.getNome());
            User user = optionalUser.orElseThrow(() -> new EntityNotFoundException("User não encontrado com o nome: " + novoAgendamento.getNome()));

            novoAgendamento.setCadastro(cadastro);
            novoAgendamento.setUser(user);

            //verifica se o horário está disponível
            if (isHorarioDisponivel(novoAgendamento.getHorario())) {

                return agendamentoRepository.save(novoAgendamento);
            } else {
                throw new Exception("Horário já agendado. Escolha outro horário.");
            }
        } catch (EntityNotFoundException e) {
            throw e; // Rejeita a exceção
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar agendamento", e);
        }
    }



    private boolean isHorarioDisponivel(String horario) {
        Set<Agendamento> agendamentos = agendamentoRepository.findByHorario(horario);
        return agendamentos.isEmpty();
    }

    
    public Agendamento updateCampoAgendamento(Long id, String campo, String novoValor) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new AgendamentoNotFoundException(id));

        switch (campo) {
            case "data":
                agendamento.setData(novoValor);
                break;
            case "horario":
                agendamento.setHorario(novoValor);
                break;
            case "cpf ":
                agendamento.setCpf(novoValor);
                break;

            case "statusAgendamento":
                agendamento.setStatusAgendamento(novoValor);
                break;

            case "especialidades":
                agendamento.setEspecialidades(novoValor);
                break;

        }

        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public void deleteAgendamento(Long id) {
        agendamentoRepository.deleteById(id);
    }







}