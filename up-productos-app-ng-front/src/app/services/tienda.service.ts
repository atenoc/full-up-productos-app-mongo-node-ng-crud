import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tienda } from '../models/Tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  URI = 'http://localhost:4000/api/tiendas';
  existeTienda:boolean = false
 
  constructor(private http: HttpClient) { }

  createTienda(nombre: string, descripcion: string, telefono: string, direccion: string, imagen: File, uid:string){
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('telefono', telefono);
    fd.append('direccion', direccion);
    fd.append('imagen', imagen);
    fd.append('uid', uid);

    return this.http.post(this.URI, fd);  
  }

  getTiendas() {
    return this.http.get<Tienda[]>(this.URI);
  }

  getTienda(id: string) {
    return this.http.get<Tienda>(`${this.URI}/${id}`);
  }

  deleteTienda(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updatetienda(id:string, nombre:string, descripcion:string, telefono:string, direccion:string) {
    return this.http.put(`${this.URI}/${id}`, {nombre, descripcion,telefono,direccion});
  }
  
}
