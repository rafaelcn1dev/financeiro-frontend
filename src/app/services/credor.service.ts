import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credor } from '../models/credor';

@Injectable({
  providedIn: 'root'
})
export class CredorService {
  private apiUrl = 'https://financeiro-dlqb.onrender.com/api/credor';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Lista todos os credores
   * @returns Observable<Credor[]>
   */
  listarCredores(): Observable<Credor[]> {
    return this.http.get<Credor[]>(this.apiUrl);
  }

  /**
   * Busca um credor por ID
   * @param id - ID do credor
   * @returns Observable<Credor>
   */
  buscarCredorPorId(id: number): Observable<Credor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Credor>(url);
  }

  /**
   * Cria um novo credor
   * @param credor - Dados do credor a ser criado
   * @returns Observable<Credor>
   */
  criarCredor(credor: Omit<Credor, 'id'>): Observable<Credor> {
    return this.http.post<Credor>(this.apiUrl, credor, this.httpOptions);
  }

  /**
   * Atualiza um credor existente
   * @param id - ID do credor a ser atualizado
   * @param credor - Dados atualizados do credor
   * @returns Observable<Credor>
   */
  editarCredor(id: number, credor: Omit<Credor, 'id'>): Observable<Credor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Credor>(url, credor, this.httpOptions);
  }

  /**
   * Atualiza parcialmente um credor
   * @param id - ID do credor a ser atualizado
   * @param credorParcial - Dados parciais do credor
   * @returns Observable<Credor>
   */
  editarCredorParcial(id: number, credorParcial: Partial<Omit<Credor, 'id'>>): Observable<Credor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Credor>(url, credorParcial, this.httpOptions);
  }

  /**
   * Exclui um credor
   * @param id - ID do credor a ser excluído
   * @returns Observable<void>
   */
  excluirCredor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
