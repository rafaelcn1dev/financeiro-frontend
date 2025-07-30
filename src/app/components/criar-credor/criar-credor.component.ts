import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-criar-credor',
  templateUrl: './criar-credor.component.html',
  styleUrls: ['./criar-credor.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class CriarCredorComponent {

  constructor(private router: Router) {}

  voltar(): void {
    this.router.navigate(['/credores']);
  }

}
