import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CredoresComponent } from './components/credores/credores.component';
import { CriarCredorComponent } from './components/criar-credor/criar-credor.component';
import { EditarCredorComponent } from './components/editar-credor/editar-credor.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'credores', component: CredoresComponent },
    { path: 'criarcredor', component: CriarCredorComponent },
    { path: 'editarcredor/:id', component: EditarCredorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }