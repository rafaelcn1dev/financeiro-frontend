import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
})
export class DashboardComponent {

  constructor(private router: Router) { }

  navegarParaCredores(): void {
    this.router.navigate(['/credores']);
  }

  navegarParaCriarCredor(): void {
    this.router.navigate(['/criarcredor']);
  }

  navegarParaResponsaveis(): void {
    this.router.navigate(['/responsaveis']);
  }

  navegarParaCriarResponsavel(): void {
    this.router.navigate(['/criarresponsavel']);
  }
}
