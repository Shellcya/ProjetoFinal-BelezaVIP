import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import{ FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormularioCadastroComponent } from './pages/formulario-cadastro/formulario-cadastro.component';
import { FormRegistrarComponent } from './pages/form-registrar/form-registrar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AuthService } from './services/auth.service'; 

 import {MatTableModule} from '@angular/material/table';
 import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormAgendarComponent } from './form-agendar/form-agendar.component';
import { AgendarComponent } from './agendar/agendar.component';
import { AdminListaCadastrosComponent } from './admin-lista-cadastros/admin-lista-cadastros.component';
import { AtualizarCadastroComponent } from './atualizar-cadastro/atualizar-cadastro.component';
import { ListaCadastroComponent } from './lista-cadastro/lista-cadastro..component';
import { UsuarioAtualizarCadastroComponent } from './usuario-atualizar-cadastro/usuario-atualizar-cadastro.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
 
import { AtualizarAgendamentoComponent } from './atualizar-agendamento/atualizar-agendamento.component';
import { AdminListaAgendamentosComponent } from './admin-lista-agendamentos/admin-lista-agendamentos.component';
import { FormAgendarAdminComponent } from './form-agendar-admin/form-agendar-admin.component';
import { AgendarAdminComponent } from './agendar-admin/agendar-admin.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeUserComponent } from './home-user/home-user.component';
 
 
 
 





 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreComponent,    
    ServicosComponent,
    FooterComponent,
    HeaderComponent,
    FormularioCadastroComponent,     
    FormRegistrarComponent,          
    LoginComponent,                     
    DashboardComponent,
    AdminDashboardComponent,
    FormAgendarComponent,
    AgendarComponent,
    AdminListaCadastrosComponent,
    AtualizarCadastroComponent,
    ListaCadastroComponent,
    UsuarioAtualizarCadastroComponent,
    ListaAgendamentoComponent,
     
    AtualizarAgendamentoComponent,
    AdminListaAgendamentosComponent,
    FormAgendarAdminComponent,
    AgendarAdminComponent,
    CadastroAdminComponent,
    HomeAdminComponent,
    HomeUserComponent,
    
     
   
    
  
    
    

     
       
      
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,   
    FormsModule,   
  MatTableModule,   
  MatIconModule,  
  MatButtonModule,
  MatTooltipModule,
  ],
  
  providers: [ provideHttpClient(withFetch()), FormsModule,
    provideClientHydration(),
    provideAnimationsAsync(),
   AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
