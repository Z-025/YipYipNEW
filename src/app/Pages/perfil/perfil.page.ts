import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbService } from 'src/app/Services/db.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any = {};
  public photo: SafeResourceUrl | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private dbService: DbService
  ) { }

  async ngOnInit() {
    const username = localStorage.getItem('username') || '';
    this.user = await this.dbService.getUsuario(username) || {};
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  edit() {
    this.router.navigate(['/edit']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Actualiza tu foto de perfil',
      message: 'Selecciona fuente de imagen',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
        {
          text: 'Galería',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
      ],
    });

    await alert.present();
  }

  async takePicture(source: CameraSource) {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source
      });

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);

    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  async onSubmit() {
    await this.dbService.updateUsuario(this.user);
  }

}

