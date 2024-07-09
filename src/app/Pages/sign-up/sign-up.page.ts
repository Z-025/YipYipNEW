import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  orcid: string = '';
  fechaNacimiento: string = '';
  nivelEducacion: string = '';
  areaInteres: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DbService
  ) {}

  async guardarDatos() {
    if (!this.validarDatos()) {
      return;
    }

    const usuario = {
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      orcid: this.orcid,
      fechaNacimiento: this.fechaNacimiento,
      nivelEducacion: this.nivelEducacion,
      areaInteres: this.areaInteres
    };

    await this.dbService.insertUsuario(usuario);

    // Guardar los datos del usuario en localStorage
    localStorage.setItem('username', this.username);
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('correo', this.correo);
    localStorage.setItem('orcid', this.orcid);
    localStorage.setItem('fechaNacimiento', this.fechaNacimiento);
    localStorage.setItem('nivelEducacion', this.nivelEducacion);
    localStorage.setItem('areaInteres', this.areaInteres);

    this.presentAlert('Usuario registrado exitosamente');
    this.router.navigate(['/login']); // Redirige a la página de login después de registrar el usuario
  }

  validarDatos(): boolean {
    // Aquí puedes implementar lógica para validar los datos del formulario
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.presentAlert('Usuario y contraseña son obligatorios');
      return false;
    }
    // Implementa más validaciones según tus requerimientos
    return true;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
