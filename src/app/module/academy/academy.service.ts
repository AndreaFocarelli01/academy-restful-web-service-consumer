import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Academy } from '../../model/academy.model';

@Injectable({
  providedIn: 'root'
})
//questo service deve essere in grado di mandare e ricevere JSON, va però specificato
export class AcademyService {
  //url che ho settato da Spring
  private apiURL = "http://localhost:8080/rest/api/academies"

  //"http://localhost:8080/rest/api/academies/code/{code}"


  //specifica del formato con la quale stiamo interagendo, JSON in questo caso (ma potrebbe essere anche XML)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //HttpClient service predefinito di Angular, utilizzato per effettuare chiamate REST (GET, POST, PUT, DELETE)
  constructor(private httpClient: HttpClient) {

  }
  //GET
  /*
    tutti i metodi REST, ritornano un Observable; questo è un API, in grado di convertire un JSON in TS
    può trovarsi in 3 stati differenti: 
    - NEXT (chiamata ad un servizio REST, effettuata ma ancora non terminata)
    - COMPLETED (chiamata ad un servizio REST, effettuata con successo)
    - ERROr (la chiamata ad un servizio REST, ha provocato una eccezione)
  */
  getAcademies(): Observable<any> {
    //stessa cosa che abbiamo fatto su POSTMAN
    //chiamata GET al servizio, attraverso la quale mi viene restituito il JSON relativo alle Academies
    return this.httpClient.get(this.apiURL).pipe(catchError(this.errorHandler));
  }

  getAcademiesByCode(code: string): Observable<any> {
    //il code lo passo normalmente come stringa
    return this.httpClient.get(this.apiURL + '/code/' + code).pipe(catchError(this.errorHandler));
  }

  //POST
  saveAcademy(academy: Academy): Observable<any> {
    return this.httpClient.post(this.apiURL, JSON.stringify(academy), this.httpOptions).pipe(catchError(this.errorHandler));
    //uso stringify, perché devo necessariamente convertirlo per lavorarci sopra
    //httpOptions questa volta necessario, perché il formato dati da utilizzare va specificato
  }
  //PUT
  updateAcademy(academy: Academy): Observable<any> {
    return this.httpClient.put(this.apiURL, JSON.stringify(academy), this.httpOptions).pipe(catchError(this.errorHandler));
  }
  //DELETE
  removeAcademiesByCode(code: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/code/' + code).pipe(catchError(this.errorHandler));
  }


  //metodo per la gestione delle eventuali eccezioni derivanti da erroi delle chiamate REST
  errorHandler(exception: any) {

    let errorMessage = '';

    if (exception.error instanceof ErrorEvent) {
      errorMessage = exception.error.message;
    } else {
      errorMessage = "Error Code: ${ error.status } \nMessage: ${ error.message }";
    }
    return throwError(() => new Error(errorMessage));
  }

}
