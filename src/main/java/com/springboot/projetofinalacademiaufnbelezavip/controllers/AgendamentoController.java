package com.springboot.projetofinalacademiaufnbelezavip.controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Agendamento;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.AgendamentoRepository;
import com.springboot.projetofinalacademiaufnbelezavip.services.AgendamentoService;
import com.springboot.projetofinalacademiaufnbelezavip.services.CadastroService;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private final AgendamentoService agendamentoService;
    @Autowired
    private AgendamentoRepository agendamentoRepository;



    public AgendamentoController(AgendamentoService agendamentoService, CadastroService cadastroService) {
        this.agendamentoService = agendamentoService;

    }


    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllAgendamentos() {
        List<Map<String, Object>> agendamentos = agendamentoService.getAllAgendamentos();
        return new ResponseEntity<>(agendamentos, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public Agendamento getAgendamentoById(@PathVariable Long id) {
        return agendamentoService.getAgendamentoById(id);
    }

    @GetMapping("/agendamento/{id}")
    public ResponseEntity<Agendamento> getAgendamentoWithDetails(@PathVariable Long id) {
        Agendamento agendamento = agendamentoService.getAgendamentoById(id);

        if (agendamento != null) {
            agendamento.getUser();
            agendamento.getCadastro();

            return new ResponseEntity<>(agendamento, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/cpf")
    public ResponseEntity<List<Agendamento>> buscarPorCpf(@RequestParam String cpf) {
        List<Agendamento> agendamentos = agendamentoService.buscarAgendamentosPorCpf(cpf);
        return ResponseEntity.ok(agendamentos);
    }


    @PostMapping
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody Agendamento agendamento) {
        Agendamento salvo = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(salvo);



    }

    @PutMapping("/{id}")
    public Agendamento updateAgendamento(@PathVariable Long id, @RequestBody Agendamento agendamento) throws Exception {
        return agendamentoService.updateAgendamento(id, agendamento);

    }

    @PutMapping("/{id}/{campo}")
    public ResponseEntity<Agendamento> updateCampoAgendamento(
            @PathVariable Long id,
            @PathVariable String campo,
            @RequestParam String novoValor) {

        Agendamento agendamentoAtualizado = agendamentoService.updateCampoAgendamento(id, campo, novoValor);

        if (agendamentoAtualizado != null) {
            return ResponseEntity.ok(agendamentoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteAgendamento(@PathVariable Long id) {
        agendamentoService.deleteAgendamento(id);

    }




}




