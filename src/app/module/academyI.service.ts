import { Observable } from "rxjs";
import { Academy } from "../model/academy.model";
import { InjectionToken } from "@angular/core";

/*
    se vogliamo che una classe service venga iniettata in una component, tramite la sua interfaccia
    occorre inizializzare sotto forma di costante, un injection token attraverso il quale fare il match
    all'interno della component
*/

//injection
export const academy_service_token = new InjectionToken<AcademyServiceI>('academy_service_token');

export interface AcademyServiceI {
    getAcademies(): Observable<any>;

    getAcademiesByCode(code: string): Observable<any>;

    saveAcademy(academy: Academy): Observable<any>;

    updateAcademy(academy: Academy): Observable<any>;

    removeAcademiesByCode(code: string): Observable<any>;
}