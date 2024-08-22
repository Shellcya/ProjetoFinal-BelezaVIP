import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Agendar } from '../models/agendar';
import { AgendarService } from '../services/agendar.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-agendar',
  templateUrl: './form-agendar.component.html',
  styleUrl: './form-agendar.component.css',


})
export class FormAgendarComponent {
  @Input() btnText: any;
  isSubmitting: boolean | undefined;
 



  constructor(private agendarService: AgendarService, private router: Router, private location: Location){

  }

 @Output() agendar = new EventEmitter<Agendar>();
  novoAgendamento: Agendar = {
    id: 0,
    nome: '',
    data: '',
    horario:'',
    cpf: '', 
    especialidades:'',
      
    statusAgendamento: '',
    

  };

  formatarCpf(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d{3})?(\d{3})?(\d{0,2})/, '$1.$2.$3-$4'); // Formata CPF
    }

    event.target.value = valor;
    this.novoAgendamento.cpf = valor; // Atualiza o modelo
  }


  onSubmit(form: NgForm): void {
    if (!this.novoAgendamento.nome || !this.novoAgendamento.data || !this.novoAgendamento.horario || !this.novoAgendamento.cpf || !this.novoAgendamento.especialidades || !this.novoAgendamento.statusAgendamento) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.isSubmitting = true;
     

    this.agendarService.agendamentoUsuario(this.novoAgendamento).subscribe(
      (usuarioAgendado) => {
        alert('Agendamento realizado com sucesso!');
        this.location.back();
      },
      (error) => {
        if (error.error && error.error.message === 'Horário já agendado. Escolha outro horário.') {
          alert('Horário já agendado. Escolha outro horário.');
        } else {
          alert('Erro durante o agendamento. Tente novamente.');
          console.error('Erro durante o agendamento', error);
        }
      }
    ).add(() => {
      this.isSubmitting = false;
    });



    this.novoAgendamento = {
    id: 0,
    nome: '',
    data: '',
    horario:'',
    cpf: '', 
    especialidades:'',       
    statusAgendamento: '',
    

    }

  }

}
