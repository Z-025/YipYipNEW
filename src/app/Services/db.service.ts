import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.createDatabase();
  }

  private createDatabase() {
    this.sqlite.create({
      name: 'yipyip.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      
      this.isDBReady.next(true);
      this.db = db;
      this.createTable();

      this.presentToast('Base de datos y tabla creadas con éxito');
    }).catch(e => this.presentToast('Error al crear la base de datos: ' + e));
  }

  private createTable() {
      this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          nombre TEXT,
          apellido TEXT,
          correo TEXT,
          orcid TEXT,
          fechaNacimiento TEXT,
          nivelEducacion TEXT,
          areaInteres TEXT
        )`, [])
        .then(() => this.presentToast('Tabla creada correctamente'))
        .catch(e => this.presentToast('Error al crear la tabla: ' + e));
  } 


  insertUsuario(username: string, password: string, nombre: string, apellido: string, correo: string, orcid: string, fechaNacimiento: string, nivelEducacion: string, areaInteres: string) {
      return this.db.executeSql(`
        INSERT INTO usuarios (username, password, nombre, apellido, correo, orcid, fechaNacimiento, nivelEducacion, areaInteres) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [username, password, nombre, apellido, correo, orcid, fechaNacimiento, nivelEducacion, areaInteres])
        .then(() => this.presentToast('Usuario insertado correctamente'))
        .catch(e => this.presentToast('Error al insertar usuario: ' + e));
  }

  validarUsuario(username: string, password: string) {
      return this.db.executeSql('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password])
        .then((res) => {
          if (res.rows.length > 0) {
            return res.rows.item(0);
          } else {
            return null;
          }
        })
        .catch(error => this.presentToast('Error al validar usuario: ' + error));
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }
}
