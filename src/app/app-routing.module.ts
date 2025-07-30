import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredoresComponent } from './components/credores/credores.component';

const routes: Routes = [
    { path: '', redirectTo: '/credores', pathMatch: 'full' },
    { path: 'credores', component: CredoresComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }