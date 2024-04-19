import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tienda } from 'src/app/models/Tienda';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tienda-detalle',
  templateUrl: './tienda-detalle.component.html',
  styleUrls: ['./tienda-detalle.component.css']
})
export class TiendaDetalleComponent implements OnInit {

  id: string;
  tienda: Tienda;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tiendaService: TiendaService,
    private router: Router) { }

  ngOnInit() {
    //console.log("carga")
    
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      this.tiendaService.getTienda(this.id)   //volver a llamar los datos con el id recibido
        .subscribe(
          res => {
            this.tienda = res;
            console.log(res)
          },
          err => console.log(err)
        )
    });
  }

  deleteTienda(id: string) {
    this.tiendaService.deleteTienda(id)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/tiendas']);
      })
  }

  updateTienda(nombre: HTMLInputElement, descripcion: HTMLInputElement, telefono: HTMLInputElement, direccion: HTMLInputElement): boolean {
    console.log("datos: "+this.tienda._id, nombre.value, descripcion.value, telefono.value, direccion.value)
    this.tiendaService.updatetienda(this.tienda._id, nombre.value, descripcion.value, telefono.value, direccion.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/tiendas']);
      });
    return false;
  }

}
