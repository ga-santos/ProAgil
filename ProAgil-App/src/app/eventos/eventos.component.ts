import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
  // ,providers: [EventoService]
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

   constructor(
     private eventoService: EventoService 
    ,private modalService: BsModalService
   ) { } //USA O SERVIÇO AO INVÉS DO HTTP CLIENT DIRETO

   eventos_filtrados!: Evento[];
   eventos!: Evento[];
   imagemLargura = 50;
   imagemMargem = 2;
   mostrarImagem = false;
   modalRef!: BsModalRef;

  _filtroLista: string = "";

  get filtroLista(): string{
  return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventos_filtrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLowerCase();  
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }


  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    //USA O MÉTODO DO SERVICE
    this.eventoService.getAllEventos().subscribe(
      ( _eventos: Evento[]) => { 
      this.eventos = _eventos;
      this.eventos_filtrados = this.eventos;
      console.log(_eventos);
    }, error => {
      console.log(error);
    }
    );
  }

}
