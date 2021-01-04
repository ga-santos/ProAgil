import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  
  /*
  eventos: any = [
    {
      EventoId: 1
      ,Tema: "Angular"
      ,Local: "São Paulo"
    },
    {
      EventoId: 2
      ,Tema: ".NET"
      ,Local: "São Bernardo"
    }
  ]
  */

 _filtroLista: string = "";

get filtroLista(): string{
 return this._filtroLista;
}

set filtroLista(value: string){
  this._filtroLista = value;
  this.eventos_filtrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
}

filtrarEvento(filtrarPor: string): any {
  filtrarPor = filtrarPor.toLowerCase();  
  return this.eventos.filter(
    evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
  );
}

  eventos_filtrados: any  = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get("http://localhost:5000/api/values").subscribe(response => {
      this.eventos = response;
      console.log(response);
    }, error => {
      console.log(error);
    }
    );
  }

}
