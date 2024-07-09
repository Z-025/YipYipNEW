import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historial: { [username: string]: any[] } = {};

  constructor(private apiService: ApiService) {}

  agregarBusqueda(username: string, metadata: any) {
    if (!this.historial[username]) {
      this.historial[username] = [];
    }
    this.historial[username].push(metadata);
  }

  obtenerHistorial(username: string) {
    return this.historial[username] || [];
  }

  obtenerCitaciones(doi: string) {
    return this.apiService.searchByDOI(doi);
  }
}
