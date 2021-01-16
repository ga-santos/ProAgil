import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

// DATA E HORA CONFIGURAÇÃO
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { templateJitUrl } from '@angular/compiler';

defineLocale('pt-br', ptBrLocale)

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
    ,private fb: FormBuilder
    ,private localeService: BsLocaleService
   ) {
     this.localeService.use('pt-br');
    } //USA O SERVIÇO AO INVÉS DO HTTP CLIENT DIRETO

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

   eventos_filtrados!: Evento[];
   eventos!: Evento[];
   evento: Evento;
   imagemLargura = 50;
   imagemMargem = 2;
   mostrarImagem = false;
   modalRef!: BsModalRef;

   modoSalvar = 'post'

   bodyDeletarEvento = '';

  registerForm!: FormGroup;

  _filtroLista: string = "";

  get filtroLista(): string{
  return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventos_filtrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLowerCase();  
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  // ------------------------ INICIO FORMULÁRIO --------------------------
  // VALIDAÇÃO DO FORMULÁRIO
  validation(){
    this.registerForm = this.fb.group({ //CADA UM DOS ITENS CORRESPONDE A UM CAMPO QUE TEM UM FORM CONTROL NAME COM O VALOR
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['',Validators.required],
      dataEvento: ['',Validators.required],
      imagemURL: ['',Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.maxLength(120000)]],
      telefone: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  // ABRE TEMPLATE DO MODAL
  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }

  novoEvento(template: any){
    this.modoSalvar = 'post'
    this.openModal(template);
  }
  
  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put'
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento); // PASSA TODO EVENTO PARA O FORMULÁRIO
  }

  // INSERÇÃO DOS DADOS NO BANCO DE DADOS
  salvarAlteracao(template: any){
    if(this.registerForm.valid){

        if(this.modoSalvar == 'post'){
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: any) => {
              console.log(novoEvento);
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error);
            }
          );
        }else{
          this.evento = Object.assign({id: this.evento.id}, this.registerForm.value); //com o ID atribui o evento exato
          this.eventoService.putEvento(this.evento).subscribe(
            () => {
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error);
            }
          );
        }
    }
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }
  
  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
        }, error => {
          console.log(error);
        }
    );
  }
  // ------------------------ FINAL FORMULÁRIO --------------------------

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
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
