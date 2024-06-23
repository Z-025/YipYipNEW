import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  public home!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
  });
}

  navigateTo(tab: string) {
    if (tab === 'buscador') {
      this.router.navigate(['/buscador']);
    } else if (tab === 'historial') {
      this.router.navigate(['/historial']);
    }
  }
}
