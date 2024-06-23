import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
}

  onSubmit () {
  }
  
}