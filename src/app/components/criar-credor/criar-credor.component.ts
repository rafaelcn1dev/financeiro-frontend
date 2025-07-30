import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CredorService } from '../../services/credor.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-criar-credor',
  templateUrl: './criar-credor.component.html',
  styleUrls: ['./criar-credor.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule],
})
export class CriarCredorComponent {
  
  // Propriedades para o formulário
  nome: string = '';
  diaDeVencimento: number = 1;

  constructor(
    private router: Router,
    private credorService: CredorService,
    private toastService: ToastService
  ) {}

  voltar(): void {
    this.router.navigate(['/credores']);
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  
  salvar(): void {
    // Validações básicas
    if (!this.nome.trim()) {
      this.toastService.showError('Nome do credor é obrigatório!');
      return;
    }

    if (this.diaDeVencimento < 1 || this.diaDeVencimento > 31) {
      this.toastService.showError('Dia de vencimento deve estar entre 1 e 31!');
      return;
    }

    // Criar objeto credor (sem ID, pois será gerado pela API)
    const novoCredor = {
      nome: this.nome.trim(),
      diaDeVencimento: this.diaDeVencimento
    };

    // Chamar o serviço para criar o credor
    this.credorService.criarCredor(novoCredor).subscribe({
      next: (credorCriado) => {
        console.log('Credor criado com sucesso:', credorCriado);
        this.toastService.showSuccess(`Credor "${credorCriado.nome}" criado com sucesso!`);
        this.voltar();
      },
      error: (error) => {
        console.error('Erro ao criar credor:', error);
        this.toastService.showError('Erro ao criar credor. Tente novamente.');
      }
    });
  }

}
