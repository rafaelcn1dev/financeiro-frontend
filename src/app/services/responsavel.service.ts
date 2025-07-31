import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsavel } from '../models/responsavel';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {
  private apiUrl = 'https://financeiro-dlqb.onrender.com/api/responsavel';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Lista todos os Responsaveis
   * @returns Observable<Responsavel[]>
   */
  listarResponsaveis(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(this.apiUrl);
  }

  /**
   * Busca um responsavel por ID
   * @param id - ID do responsavel
   * @returns Observable<Responsavel>
   */
  buscarResponsavelPorId(id: number): Observable<Responsavel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Responsavel>(url);
  }

  /**
   * Cria um novo responsavel
   * @param responsavel - Dados do responsavel a ser criado
   * @returns Observable<Responsavel>
   */
  criarResponsavel(responsavel: Omit<Responsavel, 'id'>): Observable<Responsavel> {
    return this.http.post<Responsavel>(this.apiUrl, responsavel, this.httpOptions);
  }

  /**
   * Atualiza um responsavel existente
   * @param id - ID do responsavel a ser atualizado
   * @param responsavel - Dados atualizados do responsavel
   * @returns Observable<Responsavel>
   */
  editarResponsavel(id: number, responsavel: Omit<Responsavel, 'id'>): Observable<Responsavel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Responsavel>(url, responsavel, this.httpOptions);
  }

  /**
   * Exclui um responsavel
   * @param id - ID do responsavel a ser excluído
   * @returns Observable<void>
   */
  excluirResponsavel(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
