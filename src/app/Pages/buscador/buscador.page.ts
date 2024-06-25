import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Plugins, Capacitor } from '@capacitor/core';
const { BarcodeScanner } = Plugins;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage {
  searchTerm: string = '';
  searchResult: any = null;

  constructor(private router: Router, private apiService: ApiService) {}

  goToHome() {
    this.router.navigate(['home']);
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== '') {
      this.searchByDOI(searchTerm);
    } else {
      this.searchResult = null;
    }
  }

  searchByDOI(doi: string) {
    this.apiService.searchByDOI(doi).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.searchResult = response;
      },
      (error) => {
        console.error('Error fetching search results', error);
        this.searchResult = null;
      }
    );
  }

  async startScan() {
    if (Capacitor.isPluginAvailable('BarcodeScanner')) {
      try {
        const result = await BarcodeScanner['startScan'](); // Corregido aquí
        if (!result.cancelled) {
          this.searchTerm = result.text;
          this.onSearchInput({ target: { value: result.text } });
        }
      } catch (error) {
        console.error('Error scanning barcode', error);
      }
    } else {
      console.error('BarcodeScanner plugin not available');
    }
  }
}
