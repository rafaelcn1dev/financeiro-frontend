import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { ResponsavelService } from 'src/app/services/responsavel.service';

@Component({
  selector: 'app-criar-responsavel',
  templateUrl: './criar-responsavel.component.html',
  styleUrls: ['./criar-responsavel.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule],

})
export class CriarResponsavelComponent {
  // Propriedades para o formulário
    nome: string = '';
  
    constructor(
      private router: Router,
      private responsavelService: ResponsavelService,
      private toastService: ToastService
    ) {}
  
    voltar(): void {
      this.router.navigate(['/responsaveis']);
    }
  
    voltarDashboard(): void {
      this.router.navigate(['/dashboard']);
    }
    
    salvar(): void {
      // Validações básicas
      if (!this.nome.trim()) {
        this.toastService.showError('Nome do responsavel é obrigatório!');
        return;
      }

  
      // Criar objeto responsavel (sem ID, pois será gerado pela API)
      const novoResponsavel = {
        nome: this.nome.trim()
      };

      // Chamar o serviço para criar o responsável
      this.responsavelService.criarResponsavel(novoResponsavel).subscribe({
        next: (responsavelCriado) => {
          console.log('Responsável criado com sucesso:', responsavelCriado);
          this.toastService.showSuccess(`Responsável "${responsavelCriado.nome}" criado com sucesso!`);
          this.voltar();
        },
        error: (error) => {
          console.error('Erro ao criar responsável:', error);
          this.toastService.showError('Erro ao criar responsável. Tente novamente.');
        }
      });
    }  
 }
