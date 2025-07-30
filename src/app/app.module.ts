import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CredoresComponent } from './components/credores/credores.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CriarCredorComponent } from './components/criar-credor/criar-credor.component';
import { EditarCredorComponent } from './components/editar-credor/editar-credor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    DashboardComponent,
    CredoresComponent,
    CriarCredorComponent,
    EditarCredorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
