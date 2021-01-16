import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule} from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' // CORRIGE DROPDOWN MENU

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';

@NgModule({
  declarations: [		
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe // pipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(), //NGX-BOOTSTRAP
    BsDatepickerModule.forRoot(), //NGX-BOOTSTRAP
    TooltipModule.forRoot(), //NGX-BOOTSTRAP
    ModalModule.forRoot(), //NGX-BOOTSTRAP
    BrowserAnimationsModule, // CORRIGE DROPDOWN MENU
    ReactiveFormsModule // ATIVA O FORMS 
  ],
  providers: [
    EventoService // serviço
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
