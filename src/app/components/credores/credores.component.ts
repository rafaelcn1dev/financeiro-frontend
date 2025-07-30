import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Credor } from 'src/app/models/credor';
import { CredorService } from 'src/app/services/credor.service';


@Component({
  selector: 'app-credores',
  templateUrl: './credores.component.html',
  styleUrls: ['./credores.component.css'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, HttpClientModule, MatButtonModule, MatIconModule],
})
export class CredoresComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = ['id', 'nome', 'diaDeVencimento', 'acao'];
  dataSource = new MatTableDataSource<Credor>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private credorService: CredorService,
    private router: Router
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
}
