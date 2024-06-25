import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  usuarioRecibido: string='';
  passwordRecibido: string='';

    username: any='';
    nombre: any='';
    apellido: any='';
    nivelEducacion: any=''; 
    fechaNacimiento: any='';
    password: any='';
    areaInteres: any='';
    orcid: any='';
    correo: any='';

    usuarioRecibidoPersistente: any='';

    isDBReady: boolean = false;


  constructor(private router:Router,
              private activateroute:ActivatedRoute, 
              private alertController:AlertController,
              private dbService: DbService) {
    this.activateroute.queryParams.subscribe( params =>{
      if(this.router.getCurrentNavigation()?.extras?.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
        this.passwordRecibido = this.router.getCurrentNavigation()?.extras?.state?.['passwordEnviado']; 

    console.log();
    }
  })
}

  ngOnInit() {
    this.dbService.getIsDBReady().subscribe(isReady => {
    this.isDBReady = isReady;
    if (isReady) {
  // Aquí puedes llamar a funciones para cargar datos, etc. desde la base de datos
      }
    });
  }

async presentAlert(message: string) {
const alert = await this.alertController.create({
header: 'Mensaje',
message: message,
buttons: ['OK']
});

await alert.present();
}


guardar() {
if (this.nombre.trim() === '' || this.apellido.trim() === '') {
this.presentAlert('Error: nombre y apellido vacios');
} else {
this.guardarDatos();  
}
}

guardarDatos() {
this.dbService.insertUsuario(this.nombre, this.apellido, this.username, this.password, this.fechaNacimiento, this.orcid, this.areaInteres, this.correo, this.nivelEducacion)
.then(() => {
this.presentAlert('Datos guardados exitosamente');
// Aquí puedes añadir lógica adicional, como mostrar un mensaje de éxito al usuario.
})
.catch(error => {
this.presentAlert('Error al guardar datos:'+ error);
// Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
});
}

goToHome() {
    this.router.navigate(['/home']);
}
  }
