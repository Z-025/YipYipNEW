import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'; 
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./Pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  {
    path: 'edit',
    loadChildren: () => import('./Pages/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./Pages/buscador/buscador.module').then( m => m.BuscadorPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import( './Pages/historial/historial.module').then( m => m.HistorialPageModule),
    canActivate: [authGuard]
  },

  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [authGuard]
})
export class AppRoutingModule {}
