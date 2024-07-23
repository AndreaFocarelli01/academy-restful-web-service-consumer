export interface Academy {
    //ci mettiamo lo stesso nome della proprietà java dell'entity fatte in Spring
    //altrimenti il mapping non avviene correttamente tra front e back
    code: string;
    title: string;
    cityLocation: string;
    studentNumber: number;
}