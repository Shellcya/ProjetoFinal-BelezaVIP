package com.springboot.projetofinalacademiaufnbelezavip.controllers;

import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Cadastro;

import com.springboot.projetofinalacademiaufnbelezavip.services.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cadastro")
public class CadastroController {

    @Autowired
    private final CadastroService cadastroService;

    public CadastroController(CadastroService cadastroService) {
        this.cadastroService = cadastroService;
    }
    public void init() {
        cadastroService.inicializarCadastro();
    }
    //lista todos os cadastros
    @GetMapping
    public List<Cadastro> getAllCadastros(){
        return cadastroService.getAllCadastros();
    }
    //busca o cadastro pelo id
    @GetMapping("/{id}")
    public Cadastro getCadastroById(@PathVariable Long id) {
        return cadastroService.getCadastroById(id);
    }
    //busca o cadastro pelo cpf
    @GetMapping("/cpf")
    public ResponseEntity<List<Cadastro>> buscarPorCpf(@RequestParam String cpf) {
        try {
            List<Cadastro> cadastros = cadastroService.getCadastroByCpf(cpf);
            return ResponseEntity.ok(cadastros);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping
    public Cadastro createCadastro(@RequestBody Cadastro novoCadastro) {
        return cadastroService.createCadastro(novoCadastro);
    }

    @PutMapping("/{id}")
    public Cadastro updateCadastro(@PathVariable Long id, @RequestBody Cadastro cadastro) {
        return cadastroService.updateCadastro(id, cadastro);
    }

    @PutMapping("/{id}/{campo}")//atualiza o campo desejado no cadastro
    public ResponseEntity<Cadastro> updateCampoCadastro(
            @PathVariable Long id,
            @PathVariable String campo,
            @RequestParam String novoValor) {

        Cadastro cadastroAtualizado = cadastroService.updateCampoCadastro(id, campo, novoValor);

        if (cadastroAtualizado != null) {
            return ResponseEntity.ok(cadastroAtualizado);
        } else {
            return ResponseEntity.notFound().build(); // Cadastro não encontrado
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCadastro(@PathVariable Long id) {

        System.out.println("Tentativa de exclusão do cadastro com ID: " + id);

        try {
            cadastroService.deleteCadastro(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}




