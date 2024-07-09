import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  ) { }

  ngOnInit() {
    // Cargar los datos del usuario desde localStorage
    this.user = {
      username: localStorage.getItem('username') || '',
      nombre: localStorage.getItem('nombre') || '',
      apellido: localStorage.getItem('apellido') || '',
      nivelEducacion: localStorage.getItem('nivelEducacion') || '',
      fechaNacimiento: localStorage.getItem('fechaNacimiento') || '',
      correo: localStorage.getItem('correo') || '',
      orcid: localStorage.getItem('orcid') || '',
      areaInteres: localStorage.getItem('areaInteres') || ''
    };
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

      // Usar webPath para mostrar la nueva imagen en lugar de base64, ya que está cargada en memoria
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);

    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  onSubmit() {
    // Implementa la lógica para la función de submit si es necesario
  }

}
