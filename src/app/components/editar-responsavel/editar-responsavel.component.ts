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
import { ActivatedRoute } from '@angular/router';
import { Responsavel } from 'src/app/models/responsavel';


@Component({
  selector: 'app-editar-responsavel',
  templateUrl: './editar-responsavel.component.html',
  styleUrls: ['./editar-responsavel.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule],
})
export class EditarResponsavelComponent {
  // Propriedades para o formulário
  responsavelId: number = 0;
    nome: string = '';
    diaDeVencimento: number = 1;
    carregando: boolean = true;
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private responsavelService: ResponsavelService,
      private toastService: ToastService
    ) { }
  
    ngOnInit(): void {
      this.carregarResponsavel();
    }
  
    carregarResponsavel(): void {
      // Capturar o ID da URL
      const id = this.route.snapshot.paramMap.get('id');
      
      if (!id || isNaN(Number(id))) {
        this.toastService.showError('ID do responsável inválido!');
        this.voltar();
        return;
      }

      this.responsavelId = Number(id);

      // Buscar o responsável na API
      this.responsavelService.buscarResponsavelPorId(this.responsavelId).subscribe({
        next: (responsavel: Responsavel) => {
          this.nome = responsavel.nome;
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao carregar responsável:', error);
          this.toastService.showError('Erro ao carregar dados do responsável!');
          this.carregando = false;
          this.voltar();
        }
      });
    }
  
    voltar(): void {
      this.router.navigate(['/responsaveis']);
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

  
      // Criar objeto credor atualizado
      const responsavelAtualizado = {
        nome: this.nome.trim()
      };

      // Chamar o serviço para editar o responsável
      this.responsavelService.editarResponsavel(this.responsavelId, responsavelAtualizado).subscribe({
        next: (responsavelEditado) => {
          console.log('Responsável editado com sucesso:', responsavelEditado);
          this.toastService.showSuccess(`Responsável "${responsavelEditado.nome}" editado com sucesso!`);
          this.voltar();
        },
        error: (error) => {
          console.error('Erro ao editar credor:', error);
          this.toastService.showError('Erro ao editar credor. Tente novamente.');
        }
      });
    }
  
  }
  