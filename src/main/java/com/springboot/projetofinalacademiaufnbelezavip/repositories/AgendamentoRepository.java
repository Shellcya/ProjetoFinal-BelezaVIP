package com.springboot.projetofinalacademiaufnbelezavip.repositories;

import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long>{


    Set<Agendamento> findByHorario(String horario);


    List<Agendamento> findByCpf(String cpf);


    @Query("SELECT DISTINCT a FROM Agendamento a LEFT JOIN FETCH a.user LEFT JOIN FETCH a.cadastro")
    List<Agendamento> findAllWithJoinFetch();




}
