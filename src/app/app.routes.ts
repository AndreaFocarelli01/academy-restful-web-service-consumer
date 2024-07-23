import { Routes } from '@angular/router';
import { IndexComponent } from './module/academy/index/index.component';
import { CreateComponent } from './module/academy/create/create.component';
import { EditComponent } from './module/academy/edit/edit.component';

//all'interno del file è possibile settare le rotte di navigazione
//ovvero in che folder dell'applicazione sono effettivamente e dove andrò a finire in base al relativo metodo HTTP che ho utilizzato
export const routes: Routes = [
    { path: 'academy', redirectTo: 'academy/index', pathMatch: 'full' },    //primo percorso da caricare "index.html"
    //con questi sotto mi sposto nelle varie component create 
    { path: 'academy/index', component: IndexComponent },
    { path: 'academy/create', component: CreateComponent },                 //create.html
    { path: 'academy/:code/edit', component: EditComponent }                //edit.html
];
