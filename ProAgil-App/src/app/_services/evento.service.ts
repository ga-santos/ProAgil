import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root' //PODEMOS INJETAR EM QUALQUER COMPONENTE COM O ROOT
})


// AQUI SÓ IREMOS REFERENCIAR O CAMINHO PARA PEGAR O CONTEÚDO NA API
export class EventoService {
  baseURL = 'http://localhost:5000/api/evento';

  constructor(private http: HttpClient) { }

  getAllEventos() :  Observable<Evento[]> 
  {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getEventoByTema(tema: string) :  Observable<Evento[]> 
  {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`); //ESSE GET BATE NO CAMINHO DA API DA URL DO TEMA
  }

  getEventoById(id: number) :  Observable<Evento[]> 
  {
    return this.http.get<Evento[]>(`${this.baseURL}/${id}`);
  }
}
