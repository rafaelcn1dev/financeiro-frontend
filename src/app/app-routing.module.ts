import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredoresComponent } from './components/credores/credores.component';
import { CriarCredorComponent } from './components/criar-credor/criar-credor.component';
import { EditarCredorComponent } from './components/editar-credor/editar-credor.component';

const routes: Routes = [
    { path: '', redirectTo: '/credores', pathMatch: 'full' },
    { path: 'credores', component: CredoresComponent },
    { path: 'criarcredor', component: CriarCredorComponent },
    { path: 'editarcredor/:id', component: EditarCredorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }