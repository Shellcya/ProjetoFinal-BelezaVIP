package com.springboot.projetofinalacademiaufnbelezavip.services;

import com.springboot.projetofinalacademiaufnbelezavip.domain.servicos.Cadastro;
import com.springboot.projetofinalacademiaufnbelezavip.repositories.CadastroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CadastroService {


    @Autowired
    private final CadastroRepository cadastroRepository;


    public CadastroService(CadastroRepository cadastroRepository) {
        this.cadastroRepository= cadastroRepository;
    }


    public void inicializarCadastro() {
        Cadastro cadastro = new Cadastro();
        cadastroRepository.save(cadastro);


    }


    public List<Cadastro> getAllCadastros() {
        return (List<Cadastro>) cadastroRepository.findAll();
    }

    public Cadastro getCadastroById(Long id) {
        Optional<Cadastro> optionalCadastro = (Optional<Cadastro>) cadastroRepository.findById(id);
        return optionalCadastro.orElse(null);

    }

    public List<Cadastro> getCadastroByCpf(String cpf) {
        return cadastroRepository.findByCpf(cpf);
    }

    public Cadastro createCadastro(Cadastro  novoCadastro) {
        return cadastroRepository.save(novoCadastro);
    }
    public Cadastro updateCadastro(Long id, Cadastro cadastro) {
        if (cadastroRepository.existsById(id)) {
            cadastro.setId(id);
            return cadastroRepository.save(cadastro);
        } else {
            return null;
        }
    }

    public void deleteCadastro(Long id) {
        cadastroRepository.deleteById(id);
    }


      public Cadastro updateCampoCadastro(Long id, String campo, String novoValor) {
        Cadastro cadastro = cadastroRepository.findById(id)
                .orElseThrow(() -> new CadastroNotFoundException(id));

        switch (campo) {
            case "nome":
                cadastro.setNome(novoValor);
                break;
             case "cpf":
                cadastro.setCpf(novoValor);
                break;
            case "telefone":
                cadastro.setTelefone(novoValor);
                break;
            case "email":
                cadastro.setEmail(novoValor);
                break;
            case "cep":
                cadastro.setCep(novoValor);
                break;
            case "enderecoCompleto":
                cadastro.setEnderecoCompleto(novoValor);
                break;
            case "cidade":
                cadastro.setCidade(novoValor);
                break;
            case "uf":
                cadastro.setUf(novoValor);
                break;
            case "bairro":
                cadastro.setBairro(novoValor);
                break;
            case "complemento":
                cadastro.setComplemento(novoValor);
                break;

            default:
                throw new IllegalArgumentException("Campo inválido: " + campo);
        }

        return cadastroRepository.save(cadastro);
    }


     }
