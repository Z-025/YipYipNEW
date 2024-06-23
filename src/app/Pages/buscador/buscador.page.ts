import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

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
}
