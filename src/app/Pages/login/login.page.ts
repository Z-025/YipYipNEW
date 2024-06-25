import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  sesion_activa: any="";
  mensaje: string='';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private dbService: DbService
  ) {}

  ngOnInit() {

  }

  async login() {
    const usuario = await this.dbService.validarUsuario(this.username, this.password);
    if (usuario) {
      let NavigationExtras: NavigationExtras = {
        state: {
          usuarioEnviado: this.username,
          passwordEnviado: this.password
        }
      };
      this.router.navigate(['/home'], NavigationExtras);
    } else {
      this.presentAlert('No existe el usuario en la base de datos');
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
