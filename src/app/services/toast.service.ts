import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Exibe toast de sucesso
   * @param message Mensagem a ser exibida
   * @param duration Duração em millisegundos (padrão: 4000)
   */
  showSuccess(message: string, duration: number = 4000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    
    this.snackBar.open(message, 'Fechar', config);
  }

  /**
   * Exibe toast de erro
   * @param message Mensagem a ser exibida
   * @param duration Duração em millisegundos (padrão: 5000)
   */
  showError(message: string, duration: number = 5000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    
    this.snackBar.open(message, 'Fechar', config);
  }

  /**
   * Exibe toast de aviso
   * @param message Mensagem a ser exibida
   * @param duration Duração em millisegundos (padrão: 4000)
   */
  showWarning(message: string, duration: number = 4000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    
    this.snackBar.open(message, 'Fechar', config);
  }

  /**
   * Exibe toast de informação
   * @param message Mensagem a ser exibida
   * @param duration Duração em millisegundos (padrão: 3000)
   */
  showInfo(message: string, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    
    this.snackBar.open(message, 'Fechar', config);
  }
}
