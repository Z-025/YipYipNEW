import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  login() {
    if (this.isValidForm()) {
      // Navegar a la página Home y pasar el nombre de usuario como parámetro
      this.router.navigate(['/home'], { queryParams: { username: this.username } });
    }
  }

  isValidForm(): boolean {
    if (!this.username || this.username.length < 3 || this.username.length > 8) {
      alert('El nombre de usuario debe tener entre 3 y 8 caracteres.');
      return false;
    }
    if (!this.password || !/^\d{4}$/.test(this.password)) {
      alert('La contraseña debe ser numérica de 4 dígitos.');
      return false;
    }
    return true;
  }
}
