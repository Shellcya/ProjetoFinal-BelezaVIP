import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgendarService } from '../services/agendar.service';
@Component({
  selector: 'app-lista-agendamento',
  templateUrl: './lista-agendamento.component.html',
  styleUrl: './lista-agendamento.component.css'
})
export class ListaAgendamentoComponent {
  dataSource = new MatTableDataSource<any>();

  cpfParaBuscar = '';
  dadosUsuario: any;
  displayedColumns: string[] = ['id','nome','data','horario','cpf', 'especialidades', 'statusAgendamento', 'acoes'];
  constructor(private agendarService: AgendarService, private router: Router) {}


  ngOnInit(): void {
  }

  buscarPorCpf1(): void {
    this.buscarPorCpf1();
  }
  buscarPorCpf() {
    if (this.cpfParaBuscar) {
      const cpf = this.cpfParaBuscar.replace(/\D/g, ''); // Remover caracteres não numéricos do CPF
      this.agendarService.getAgendamentoByCpf(this.cpfParaBuscar)
          .subscribe(
              (dados) => {
                console.log('Dados recebidos:', dados);
                  this.dadosUsuario = dados;
                  this.dataSource.data = dados; // Adiciona os dados ao dataSource
              },
              (erro) => {
                  console.error('Erro ao buscar por CPF', erro);
              }
          );
  }
  }

  sair(): void {
    console.log('Botão Sair clicado');
    this.router.navigate(['/dashboard']);
  }


}