import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URI = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) { }

  createUsuario(correo: string){
    const fd = new FormData();
    fd.append('correo', correo);

    return this.http.post(this.URI, fd);  
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URI);
  }

  getUsuario(id: string) {
    return this.http.get<Usuario>(`${this.URI}/${id}`);
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updateUsuario(id: string, nombre: string) {
    return this.http.put(`${this.URI}/${id}`, {nombre});
  }

}
