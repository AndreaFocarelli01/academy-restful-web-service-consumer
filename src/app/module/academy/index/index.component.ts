import { Component, inject, OnInit } from '@angular/core';
import { Academy } from '../../../model/academy.model';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { AcademyService } from '../academy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  //se vogliamo fare l'injection è necessario aggiungere 
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

//carico questa component appena parte (ngOnInit())
//lo fa invocando getAcademies della classe AcademyService, e dopo averle ottenute le deve inserire in un'array
//il cui contenuto dovrà essere mostrato sul template
export class IndexComponent implements OnInit {


  //array per tutte le academies inizialmente vuoto
  academies: Academy[] = [];
  //l'injection lo facciamo così, token per fare l'injectione e interfaccia relativa ad essa
  private academyService = inject<AcademyServiceI>(academy_service_token);

  getAcademies(): void {
    //esiste una funzione "subscribe", che permette l'attesa della restituzione degli eventi
    //accetta in input due funzioni di call-back: 
    //una gestisce il caso NEXT, l'altra invece gestice quello negativo ERROR
    this.academyService.getAcademies().subscribe({
      //stato Observable NEXT
      next: (res) => {
        this.academies = res;
        console.log('Data fetched successfully', res);
      },
      //stato Observable ERROR
      error: (err) => {
        console.error('Error fetching data', err);
      }
    })
  }

  //metodo per la rimozione dell'academy by code
  removeAcademy(code: string) {
    this.academyService.removeAcademiesByCode(code).subscribe(res => {
      console.log(res.data);
      this.removeAcademy(code);
    });
  }


  ngOnInit(): void {
    this.getAcademies();
  }
}