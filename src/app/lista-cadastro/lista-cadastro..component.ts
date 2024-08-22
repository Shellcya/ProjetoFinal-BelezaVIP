import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';


@Component({
  selector: 'app-lista-cadastro',
  templateUrl: './lista-cadastro.component.html',
  styleUrl: './lista-cadastro.component.css'
})
export class ListaCadastroComponent implements OnInit{
  /*dataSource: MatTableDataSource<Cadastro>*/
  dataSource = new MatTableDataSource<any>();

  cpfParaBuscar = '';
  dadosUsuario: any;
  displayedColumns: string[] = ['id', 'nomeCompleto', 'dataNascimento','cpf',
  'telefone','email', 'cep','enderecoCompleto','complemento','bairro','cidade','uf',
 'acoes'];
  constructor(private cadastroService: CadastroService, private router: Router) {}


  ngOnInit(): void {
  }

  buscarPorCpf1(): void {
    this.buscarPorCpf();
  }
  buscarPorCpf() {
    if (this.cpfParaBuscar) {
      const cpf = this.cpfParaBuscar.replace(/\D/g, '');  
      this.cadastroService.getCadastroByCpf(this.cpfParaBuscar)
          .subscribe(
              (dados) => {
                console.log('Dados recebidos:', dados);
                  this.dadosUsuario = dados;
                  this.dataSource.data = dados;  
              },
              (erro) => {
                  console.error('Erro ao buscar por CPF', erro);
              }
          );
  }

  }
  irParaAtualizacao(id: number): void {
    this.router.navigate(['/usuario-atualizar-cadastro', id]);
  }
  atualizarCadastro(id: number): void {
    this.router.navigate(['/usuario-atualizar-cadastro'], {
      queryParams: {
        id: id,
        nomeCompleto: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: '',
        cep: '',
        enderecoCompleto: '',
        complemento: '',
        bairro : '',
        cidade: '',
       uf: '',
        
      }
    });
  }

  sair(): void {
    console.log('Botão Sair clicado');
    this.router.navigate(['/dashboard']);
  }




  excluirCadastro(id: number): void {
    if (confirm('Você tem certeza que deseja excluir este cadastro?')) {
      this.cadastroService.deleteCadastro(id).subscribe(
        () => {
          console.log('Cadastro excluído com sucesso');
          // Atualize a tabela após exclusão
          this.dataSource.data = this.dataSource.data.filter((item: any) => item.id !== id);
        },
        (erro) => {
          console.error('Erro ao excluir cadastro', erro);
        }
      );
    }
  }
}
