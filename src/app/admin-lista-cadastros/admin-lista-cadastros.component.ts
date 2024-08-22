import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';
 
 

@Component({
  selector: 'app-admin-lista-cadastros',
  templateUrl: './admin-lista-cadastros.component.html',
  styleUrl: './admin-lista-cadastros.component.css'
})
export class AdminListaCadastrosComponent implements OnInit{
  
  cpfParaBuscar = '';
  dadosUsuario: any;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'id',
    'nome',
    'dataNascimento',
    'cpf',
    'telefone',
    'email',
    'cep',
    'enderecoCompleto',
    'complemento',
    'cidade',
    'bairro',
    'uf',
   
    'acoes',
  ];

  constructor(private cadastroService: CadastroService, private router: Router) {}

  ngOnInit(): void {
    this.getCadastros();
  }


 
  getCadastros(): void {
    this.cadastroService.getCadastros().subscribe({
      next: (dados) => {
        this.dataSource = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar cadastros', erro);
      }
    });
  }
  
  deleteCadastro(cadastro: any): void {
    if (confirm('Tem certeza que deseja excluir este cadastro?')) {
      if (cadastro && cadastro.id) {
        this.cadastroService.deleteCadastro(cadastro.id).subscribe({
          next: () => {
            // Atualiza a lista após a exclusão
            this.getCadastros();
            this.router.navigate(['/admin-lista-cadastro']);
          },
          error: (erro) => {
            console.error('Erro ao excluir cadastro', erro);
          }
        });
      }
    }
  }
 
  
  sair(): void {
    console.log('Botão Sair clicado');
    this.router.navigate(['/admin-dashboard']);
  }
  irParaAtualizacao(id: number): void {
    this.router.navigate(['/atualizar-cadastro', id]);
  }
  atualizarCadastro(id: number): void {
    this.router.navigate(['/atualizar-cadastro'], {
      queryParams: {
        id: id,
        nome : '',
        dataNascimento: '',
        cpf : '',
        telefone: '',
        email: '',
        cep: '',
        enderecoCompleto: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
       
      }
    });
  }

}







