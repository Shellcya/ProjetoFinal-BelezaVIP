import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cadastro } from '../models/cadastro';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrl: './cadastro-admin.component.css'
})
export class CadastroAdminComponent {
  @Input()
  btnText: any;
  router: any;
  isSubmitting: boolean | undefined;
  
  constructor(private cadastroService: CadastroService, private location: Location) {}


 @Output() cadastrar = new EventEmitter<Cadastro>();
  novoCadastro: Cadastro = {
    id: 0,
    nome: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    enderecoCompleto: '',
    cidade: '',
    bairro: '',
    uf:'',
    complemento:''

  };


  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); // Formata telefone
    }
  
    event.target.value = valor;
    this.novoCadastro.telefone = valor; // Atualiza o modelo
  }

  formatarCpf(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length <= 11) {
      valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4'); // Formata CPF
    }
    event.target.value = valor;
    this.novoCadastro.cpf = valor; // Atualiza o modelo
  }

  formatarCep(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (valor.length <= 8) {
      valor = valor.replace(/^(\d{5})(\d{3})$/, '$1-$2'); // Formata CEP
    }
    event.target.value = valor;
    this.novoCadastro.cep = valor; // Atualiza o modelo
  }

  onSubmit(): void {
  // Verifica se todos os campos obrigatórios estão preenchidos
  if (!this.novoCadastro.nome || !this.novoCadastro.dataNascimento || !this.novoCadastro.cpf || 
    !this.novoCadastro.telefone || !this.novoCadastro.email || !this.novoCadastro.cep || 
    !this.novoCadastro.enderecoCompleto || !this.novoCadastro.cidade || !this.novoCadastro.bairro || 
    !this.novoCadastro.uf || !this.novoCadastro.complemento) {

  alert('Por favor, preencha todos os campos.');
  return; // Impede o envio do formulário
}

    
    this.isSubmitting = true;

    this.cadastroService.cadastroUsuario(this.novoCadastro).subscribe(
      (usuarioCadastrado) => {
        // Exibe um alerta de sucesso
        alert('Seus dados foram cadastrados com sucesso!');


        this.location.back();//volta para página anterior

      },
      (error) => {
        // Lógica de tratamento de erro, se necessário
        console.error('Erro durante o cadastro', error);
      }
      ).add(() => {
        // Reativa o botão após a conclusão da requisição (com sucesso ou erro)
        this.isSubmitting = false;
     });

    this.novoCadastro = {
      id: 0,
    nome: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    enderecoCompleto: '',
    cidade: '',
    bairro: '',
    uf:'',
    complemento:''
    };
  }


}
