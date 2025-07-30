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
import { Credor } from 'src/app/models/credor';
import { CredorService } from 'src/app/services/credor.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-credores',
  templateUrl: './credores.component.html',
  styleUrls: ['./credores.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, HttpClientModule, MatButtonModule, MatIconModule, MatSnackBarModule],
})
export class CredoresComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = ['id', 'nome', 'diaDeVencimento', 'acao'];
  dataSource = new MatTableDataSource<Credor>([]);
  credorParaExcluir: number | null = null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private credorService: CredorService,
    private router: Router,
    private toastService: ToastService
  ) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.carregarCredores();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  carregarCredores() {
    this.credorService.listarCredores().subscribe({
      next: (credores: Credor[]) => {
        this.dataSource.data = credores;
      },
      error: (error: any) => {
        this.toastService.showError('Erro ao carregar credores');
        console.error('Erro ao carregar credores:', error);
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

  adicionarCredor(): void {
    this.router.navigate(['/criarcredor']);
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  editarCredor(id: number): void {
    this.router.navigate(['/editarcredor', id]);
  }

  excluirCredor(id: number): void {
    if (this.credorParaExcluir === id) {
      // Segunda vez clicando - confirma a exclusão
      this.credorService.excluirCredor(id).subscribe({
        next: () => {
          this.toastService.showSuccess('Credor excluído com sucesso!');
          this.carregarCredores(); // Recarrega a lista
          this.credorParaExcluir = null; // Reset
        },
        error: (error: any) => {
          this.toastService.showError('Erro ao excluir credor');
          console.error('Erro ao excluir credor:', error);
          this.credorParaExcluir = null; // Reset
        }
      });
    } else {
      // Primeira vez clicando - mostra aviso de confirmação
      this.credorParaExcluir = id;
      this.toastService.showWarning('Clique novamente no botão Excluir para confirmar a exclusão');
      
      // Reset após 5 segundos
      setTimeout(() => {
        this.credorParaExcluir = null;
      }, 5000);
    }
  }
}
