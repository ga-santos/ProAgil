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

  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get("http://localhost:5000/api/values").subscribe(response => {
      this.eventos = response;
    }, error => {
      console.log(error);
    }
    );
  }

}
