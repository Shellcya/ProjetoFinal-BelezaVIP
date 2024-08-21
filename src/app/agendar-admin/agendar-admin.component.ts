import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Agendar } from '../models/agendar';
import { AgendarService } from '../services/agendar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-agendar-admin',
  templateUrl: './agendar-admin.component.html',
  styleUrl: './agendar-admin.component.css'
})
export class AgendarAdminComponent {
  @Input() btnText: any='Enviar'

  title = 'Agendar'
  agendar = {} as Agendar;
  agendamentos: Agendar[] = [];
  novoAgendamento: any;

  constructor(private agendarService: AgendarService, private authService: AuthService){}

  ngOnInit(): void {
    this.getAgendamentos();

    }

    getAgendamentos(){
      this.agendarService.getAgendamentos().subscribe(
        (agendar: Agendar[]) => {
        this.agendamentos = agendar;
      });
    }

    createAgendamento(novoAgendamento: Agendar): void {
      this.agendarService.createAgendamento(novoAgendamento).subscribe(() => {
        this.getAgendamentos(); // Atualiza a lista após a criação

      });
    }


    saveAgendamento(form: NgForm){
      if (form.valid) {
      if(this.agendar.id !== undefined){
        this.agendarService.updateAgendamento(this.agendar).subscribe(() => {
          this.cleanForm(form);
        });
        }else{
          this.agendarService.saveAgendamento(this.agendar).subscribe(() =>{
            this.cleanForm(form);
          });
      }
    }
  }
    deleteAgendamento(id: number){
    this.agendarService.deleteAgendamento(id).subscribe(() => {
      this.getAgendamentos();
    });
    }
    editAgendamento(agendamento: Agendar){
      this.agendar = { ...agendamento };
    }

    cleanForm(form: NgForm){
    this.getAgendamentos();
    form.resetForm();
    this.agendar = {} as Agendar;
    }

}

