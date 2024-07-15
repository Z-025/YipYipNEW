import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DbService } from 'src/app/Services/db.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let dbService: jasmine.SpyObj<DbService>;

  beforeEach(() => {
    const dbServiceSpy = jasmine.createSpyObj('DbService', ['validarUsuario']);
    
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: Router, useValue: {} },
        { provide: AlertController, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DbService) as jasmine.SpyObj<DbService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
