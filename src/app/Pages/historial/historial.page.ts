import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/Services/historial.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = [];

  constructor(
    private historialService: HistorialService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.historial = this.historialService.obtenerHistorial(username);
    }
  }

  async generarCitaciones(doi: string) {
    try {
      const response: any = await this.historialService.obtenerCitaciones(doi).toPromise();

      if (response.citations) {
        const alert = await this.alertController.create({
          header: 'Seleccionar Tipo de Citación',
          inputs: response.citations.map((citation: any, index: number) => ({
            name: `citation-${index}`,
            type: 'radio',
            label: citation.style_fullname,
            value: index
          })),
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Aceptar',
              handler: (selectedCitationIndex: number) => {
                if (selectedCitationIndex !== undefined) {
                  this.mostrarCitaEspecifica(response.citations[selectedCitationIndex]);
                }
              }
            }
          ]
        });

        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Citaciones',
          message: 'No hay citaciones disponibles',
          buttons: ['OK']
        });

        await alert.present();
      }
    } catch (error) {
      console.error('Error fetching citations', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un error al obtener las citaciones',
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  async mostrarCitaEspecifica(citation: any) {
    const alert = await this.alertController.create({
      header: 'Citación',
      message: `<div>
                  <p><strong>Citacion:</strong> ${citation.citation}</p>
                  <p><strong>Estilo:</strong> ${citation.style_fullname}</p>
                  <p><strong>Formato:</strong> ${citation.style_shortname}</p>
                </div>`,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
