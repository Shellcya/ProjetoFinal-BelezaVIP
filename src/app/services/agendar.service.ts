import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Agendar } from '../models/agendar';

@Injectable({
  providedIn: 'root'
})
export class AgendarService {


  private url = 'http://localhost:8080/agendamento';
  novoValor: any;
  novoAgendamento: any;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  }


  agendamentoUsuario(agendamento: Agendar): Observable<Agendar> {
    const url = `${this.url}`;
    return this.httpClient.post<Agendar>(url, agendamento);
  }
  getAgendamentos(): Observable<Agendar[]>{
    return this.httpClient.get<Agendar[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }
  getAgendamentoById(id: number): Observable<Agendar> {
    return this.httpClient.get<Agendar>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  getAgendamentoByCpf(cpf: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/cpf?cpf=${cpf}`);
}

createAgendamento(agendamento: Agendar): Observable<Agendar> {
  return this.httpClient.post<Agendar>(this.url, agendamento);
}

saveAgendamento(agendamento: Agendar): Observable<Agendar>{
    return this.httpClient.post<Agendar>(this.url, JSON.stringify(agendamento), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError))

  }
  updateAgendamento(agendamento: Agendar): Observable<Agendar>{
    const url = `${this.url}/${agendamento.id}`;
    return this.httpClient.put<Agendar>(url, agendamento, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError))
  }

  updateCampoAgendamento(id: number, campo: string, novoValor: string): Observable<any> {
    const url = `${this.url}/${id}/${campo}?novoValor=${encodeURIComponent(novoValor)}`;

    return this.httpClient.put(url, {}, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('Agendamento não encontrado', error);
        } else {
          console.error('Erro ao atualizar agendamento', error);
        }
        return throwError(error);
      })
    );
  }
  getAgendamentoField(id: number, campo: string): Observable<any> {
    const url = `${this.url}/${id}/${campo}?novoValor=${this.novoValor}`;
    return this.httpClient.get(url, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  deleteAgendamento(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
 
  handleError(error: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
    if(error.error && error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Código do erro: ${error.status},` +`mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

