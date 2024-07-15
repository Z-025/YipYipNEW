import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: any = {};
  public photo: SafeResourceUrl | undefined;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private dbService: DbService
  ) {}

  async ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.user = await this.dbService.getUsuario(username);
      this.photo = this.user.photo ? this.sanitizer.bypassSecurityTrustResourceUrl(this.user.photo) : undefined;
    } else {
      console.error('No se encontró el username en localStorage');
      this.router.navigate(['/home']); 
    }
  }

  async onSubmit(form: any) {
    if (form.valid) {
      await this.dbService.updateUsuario(this.user); 
      this.router.navigate(['/perfil']);
      this.dbService.updateUsuario(this.user);
      localStorage.setItem('nombre', this.user.nombre);
      localStorage.setItem('apellido', this.user.apellido);
      localStorage.setItem('nivelEducacion', this.user.nivelEducacion);
      localStorage.setItem('fechaNacimiento', this.user.fechaNacimiento);
      localStorage.setItem('correo', this.user.correo);
      localStorage.setItem('orcid', this.user.orcid);
      localStorage.setItem('areaInteres', this.user.areaInteres);

    }
  }

  goToPerfil() {
    this.router.navigate(['/perfil']);
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
        source,
      });

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);
      this.user.photo = capturedPhoto.webPath;
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }
}
