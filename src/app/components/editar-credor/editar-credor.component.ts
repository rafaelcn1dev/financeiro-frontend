import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CredorService } from '../../services/credor.service';
import { ToastService } from '../../services/toast.service';
import { Credor } from '../../models/credor';


@Component({
  selector: 'app-editar-credor',
  templateUrl: './editar-credor.component.html',
  styleUrls: ['./editar-credor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule],
})
export class EditarCredorComponent implements OnInit {
  
  // Propriedades para o formulário
  credorId: number = 0;
  nome: string = '';
  diaDeVencimento: number = 1;
  carregando: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private credorService: CredorService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.carregarCredor();
  }

  carregarCredor(): void {
    // Capturar o ID da URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id || isNaN(Number(id))) {
      this.toastService.showError('ID do credor inválido!');
      this.voltar();
      return;
    }

    this.credorId = Number(id);

    // Buscar o credor na API
    this.credorService.buscarCredorPorId(this.credorId).subscribe({
      next: (credor: Credor) => {
        this.nome = credor.nome;
        this.diaDeVencimento = credor.diaDeVencimento;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar credor:', error);
        this.toastService.showError('Erro ao carregar dados do credor!');
        this.carregando = false;
        this.voltar();
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/credores']);
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  editar(): void {
    // Validações básicas
    if (!this.nome.trim()) {
      this.toastService.showError('Nome do credor é obrigatório!');
      return;
    }

    if (this.diaDeVencimento < 1 || this.diaDeVencimento > 31) {
      this.toastService.showError('Dia de vencimento deve estar entre 1 e 31!');
      return;
    }

    // Criar objeto credor atualizado
    const credorAtualizado = {
      nome: this.nome.trim(),
      diaDeVencimento: this.diaDeVencimento
    };

    // Chamar o serviço para editar o credor
    this.credorService.editarCredor(this.credorId, credorAtualizado).subscribe({
      next: (credorEditado) => {
        console.log('Credor editado com sucesso:', credorEditado);
        this.toastService.showSuccess(`Credor "${credorEditado.nome}" editado com sucesso!`);
        this.voltar();
      },
      error: (error) => {
        console.error('Erro ao editar credor:', error);
        this.toastService.showError('Erro ao editar credor. Tente novamente.');
      }
    });
  }

}
