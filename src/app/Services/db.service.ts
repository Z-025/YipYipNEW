import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async insertUsuario(usuario: any): Promise<void> {
    let usuarios = await this._storage?.get('usuarios') || [];
    usuarios.push(usuario);
    await this._storage?.set('usuarios', usuarios);
  }

  async getUsuario(username: string): Promise<any> {
    let usuarios = await this._storage?.get('usuarios') || [];
    return usuarios.find((user: any) => user.username === username);
  }

  async validarUsuario(username: string, password: string): Promise<boolean> {
    const usuario = await this.getUsuario(username);
    if (usuario && usuario.password === password) {
      return true;
    }
    return false;
  }

  async updateUsuario(updatedUsuario: any): Promise<void> {
    let usuarios = await this._storage?.get('usuarios') || [];
    const index = usuarios.findIndex((user: any) => user.username === updatedUsuario.username);
    if (index !== -1) {
      usuarios[index] = updatedUsuario;
      await this._storage?.set('usuarios', usuarios);
    }
  }
  
}
