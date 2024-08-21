import { Component, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import path from 'path';
import { SobreComponent } from './pages/sobre/sobre.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { FormularioCadastroComponent } from './pages/formulario-cadastro/formulario-cadastro.component';
import { FormRegistrarComponent } from './pages/form-registrar/form-registrar.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from './auth-guard.service';
import { FormAgendarComponent } from './form-agendar/form-agendar.component';
import { AgendarComponent } from './agendar/agendar.component';
import { AdminListaCadastrosComponent } from './admin-lista-cadastros/admin-lista-cadastros.component';
import { AtualizarCadastroComponent } from './atualizar-cadastro/atualizar-cadastro.component';

import { ListaCadastroComponent } from './lista-cadastro/lista-cadastro..component';
import { UsuarioAtualizarCadastroComponent } from './usuario-atualizar-cadastro/usuario-atualizar-cadastro.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
import { AdminListaAgendamentosComponent } from './admin-lista-agendamentos/admin-lista-agendamentos.component';
import { AtualizarAgendamentoComponent } from './atualizar-agendamento/atualizar-agendamento.component';
import { FormAgendarAdminComponent } from './form-agendar-admin/form-agendar-admin.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeUserComponent } from './home-user/home-user.component';
 
 
 



const routes: Routes = [


  {path: '', component: HomeComponent},
   
   
  {path: 'login', component:LoginComponent},
  {path:'sobre', component:SobreComponent},
  {path: 'home',component:HomeComponent},
  {path: 'servicos',component:ServicosComponent},
  {path: 'formulario-cadastro',component:FormularioCadastroComponent},
  {path: 'form-registrar', component:FormRegistrarComponent},
  {path:'admin-dashboard', component:HomeAdminComponent,  canActivate: [AuthGuardService]},
  {path:'dashboard', component:HomeUserComponent, canActivate: [AuthGuardService]},
  {path:'form-agendar', component:FormAgendarComponent},
  {path: 'agendar-usuario', component: AgendarComponent},
  {path:'admin-lista-cadastro', component: AdminListaCadastrosComponent},
  {path: 'perfilAdmin/cadastro', component: AdminListaCadastrosComponent},
  {path: 'admin-lista-agendamentos', component: AdminListaAgendamentosComponent},
  {path: 'atualizar-agendamento', component: AtualizarAgendamentoComponent },
  {path:'atualizar-cadastro', component: AtualizarCadastroComponent},
  {path:'lista-cadastro', component: ListaCadastroComponent},
  {path:'lista-agendamento', component: ListaAgendamentoComponent},
  {path:'usuario-atualizar-cadastro', component: UsuarioAtualizarCadastroComponent},
  {path:'form-agendar-admin', component: FormAgendarAdminComponent},
  {path:'agendar-admin', component: FormAgendarAdminComponent},
  {path:'cadastro-admin', component: CadastroAdminComponent},
  {path:'home-admin', component: HomeAdminComponent},
  {path:'home-user', component: HomeUserComponent},
   
  
 
  

  { path: '', redirectTo: 'home', pathMatch: 'full' },

 
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
