import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { academy_service_token, AcademyServiceI } from '../../academyI.service';
import { AcademyService } from '../academy.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Academy } from '../../../model/academy.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  providers: [{ provide: academy_service_token, useClass: AcademyService }],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  academy!: Academy;
  code!: string;
  form !: FormGroup;

  //injection
  private academyService = inject<AcademyServiceI>(academy_service_token);

  //all'interno del costruttore iniettiamo l'API ActivatedRoute(), 
  //che consente di recuperare da una URL, una path variable, nel nostro caso il codice relativo al corso
  constructor(private router: Router, private route: ActivatedRoute) { }
  //lo mettiamo nel costruttore per il semplice fatto che lo iniettiamo (meglio rispetto a istanziarlo fuori)
  //uguale a fare router!: Router = new Router()

  submit() {

    this.academyService.updateAcademy(this.form.value).subscribe((res: any) => {
      console.log('Academy updated successfully!');
      this.router.navigateByUrl('academy/index');
    })

  }

  ngOnInit(): void {
    //recupero delle informazioni all'interno del DB
    this.code = this.route.snapshot.params['code'];

    this.academyService.getAcademiesByCode(this.code).subscribe((data) => {
      //valorizziamo un oggetto TS attraverso il JSON che ci arriva da back end
      this.academy = data;
      console.log(this.academy);

    });

  }
}
