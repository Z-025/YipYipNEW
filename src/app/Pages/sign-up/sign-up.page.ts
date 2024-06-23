import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage {
  user = {
    username: '',
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: '',
    password: '',
    areaInteres: '',
    orcid: '',
    correo: ''
  };

  constructor(private router: Router) {}

  register () {}
}
