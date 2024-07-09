import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/Services/db.service';

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
    private router: Router,
    private dbService: DbService
  ) {
    this.checkSession();
  }

  async checkSession() {
    const sesionActiva = localStorage.getItem('sesion_activa');
    if (sesionActiva === 'SI') {
      const username = localStorage.getItem('username');
      if (username) {
        this.username = username;
      }
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onMenuItemClick(id: any) {
    // cerrar Sesión
    if ((id == 3) && (localStorage.getItem('sesion_activa') == 'SI')) {
      localStorage.clear();
      this.router.navigate(['/login']); // Redirige a login al cerrar sesión
    }
  }
}

