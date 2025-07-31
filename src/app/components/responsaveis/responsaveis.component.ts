import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ResponsavelService } from 'src/app/services/responsavel.service';
import { Responsavel } from 'src/app/models/responsavel';

@Component({
  selector: 'app-responsaveis',
  templateUrl: './responsaveis.component.html',
  styleUrls: ['./responsaveis.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, HttpClientModule, MatButtonModule, MatIconModule, MatSnackBarModule],
})
export class ResponsaveisComponent implements AfterViewInit, OnInit {
displayedColumns: string[] = ['id', 'nome', 'acao'];
  dataSource = new MatTableDataSource<Responsavel>([]);
  responsavelParaExcluir: number | null = null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private responsavelService: ResponsavelService,
    private router: Router,
    private toastService: ToastService
  ) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.carregarResponsaveis();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  carregarResponsaveis() {
    this.responsavelService.listarResponsaveis().subscribe({
      next: (responsaveis: Responsavel[]) => {
        this.dataSource.data = responsaveis;
      },
      error: (error: any) => {
        this.toastService.showError('Erro ao carregar responsaveis');
        console.error('Erro ao carregar responsaveis:', error);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  adicionarResponsavel(): void {
    this.router.navigate(['/criarresponsavel']);
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  editarResponsavel(id: number): void {
    this.router.navigate(['/editarresponsavel', id]);
  }

  excluirResponsavel(id: number): void {
    if (this.responsavelParaExcluir === id) {
      // Segunda vez clicando - confirma a exclusão
      this.responsavelService.excluirResponsavel(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Responsável excluído com sucesso!');
          this.carregarResponsaveis(); // Recarrega a lista
          this.responsavelParaExcluir = null; // Reset
        },
        error: (error: any) => {
          this.toastService.showError('Erro ao excluir responsável');
          console.error('Erro ao excluir responsável:', error);
          this.responsavelParaExcluir = null; // Reset
        }
      });
    } else {
      // Primeira vez clicando - mostra aviso de confirmação
      this.responsavelParaExcluir = id;
      this.toastService.showWarning('Clique novamente no botão Excluir para confirmar a exclusão');
      
      // Reset após 5 segundos
      setTimeout(() => {
        this.responsavelParaExcluir = null;
      }, 5000);
    }
  }
}
