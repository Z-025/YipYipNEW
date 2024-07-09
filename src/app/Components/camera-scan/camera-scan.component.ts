import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-camera-scan',
  templateUrl: './camera-scan.component.html',
  styleUrls: ['./camera-scan.component.scss'],
})
export class CameraScanComponent  implements OnInit {
  searchTerm: string = '';
  searchResult: any;

  constructor() { }

  ngOnInit() {}

  async startScan() {

  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value;
    // Lógica para buscar en tu API utilizando searchTerm
    // y asignar el resultado a this.searchResult
  }

  goToHome() {
    // Lógica para navegar a la página de inicio
  }
}