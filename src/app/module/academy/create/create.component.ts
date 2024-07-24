import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { Academy } from '../../../model/academy.model';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  //operazione di routing, che ci permette di gestire il flusso di navigazione tra component
  private router: Router = new Router();

  //API Angular che consente ad una component di caricare REACTIVE FORM
  //si utilizza per il salvataggio di nuovi dati
  form!: FormGroup;

  private academyService = inject<AcademyServiceI>(academy_service_token);

  //necessario per l'invio dei dati tramite l'utilizzo di saveAcademy()
  submit() {
    this.academyService.saveAcademy(this.form.value).subscribe((res: any) => {
      console.log('Academy created successfully!');
      //una volta che ho inviato correttamente il form, torno nuovamente alla pagina dalla quale sono partito
      this.router.navigateByUrl('academy/index');
    })

  }

  ngOnInit(): void {
    //per la creazione dell'oggetto gli passo un JSON
    this.form = new FormGroup({
      //crazione di ogni campo all'interno della form
      //ogni campo deve essere uguale a quello che abbiamo sul DB 
      code: new FormControl(''),
      title: new FormControl(''),
      cityLocation: new FormControl(''),
      studentNumber: new FormControl(0)
    });
  }

}
