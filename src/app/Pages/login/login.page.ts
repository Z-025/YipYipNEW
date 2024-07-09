import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DbService
  ) {}

  async login() {
    const usuario = await this.dbService.validarUsuario(this.username, this.password);
    if (usuario) {
      // Usuario válido, guardar el nombre de usuario y marcar sesión activa
      localStorage.setItem('username', this.username);
      localStorage.setItem('sesion_activa', 'SI');
      this.router.navigate(['/home']);
    } else {
      // Usuario inválido, mostrar mensaje de error
      this.presentAlert('Usuario o contraseña incorrectos');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  signup() {
    this.router.navigate(['/sign-up']);
  }
}
