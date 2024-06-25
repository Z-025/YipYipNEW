import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: string = '';
  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Sign-up', url: '/sign-up', icon: 'person-add' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];
  constructor(
    private route: ActivatedRoute,
  ) {}

  onMenuItemClick(id:any)
  { 
    //cerrar Sesión
    if( (id==3) && (localStorage.getItem('sesion_activa')=='SI'))
    {
        localStorage.clear(); 
    }
}

}
