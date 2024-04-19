import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'src/app/models/Producto';
import { Tienda } from 'src/app/models/Tienda';
import { ProductoService } from 'src/app/services/producto.service';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  user:firebase.User
  productos: Producto[] = [];
  tiendas: Tienda[] = []
  agregarRender:boolean = false

  constructor(private productoService: ProductoService, private router: Router, 
    private afAuth: AngularFireAuth, private spinner: NgxSpinnerService, private tiendaService:TiendaService) {

  }

  ngOnInit() {

    /* Validando sesión */
    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        console.log("Usuario: "+ this.user.email)

      }else{
        console.log("¡Sin sesión!")
      }
    })


    console.log("carga productos...")

    this.productoService.getProductos()
    .subscribe(
      res => {
        this.productos = res;
      },
      err => console.log(err)
    )
  }

  selectedCard(id: string) {
    this.router.navigate(['/producto-detalle', id]);
  }

  agregarProducto(){
    console.log("Agregar producto")

    this.tiendaService.getTiendas().subscribe(
      res => {
        this.tiendas = res;

        console.log("this.tiendas: "+this.tiendas.length)
        if(this.tiendas.length>0){
          this.router.navigate(['/producto-form']);
        }else{
          console.log("No existe tienda")
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text:'¡Para agregar productos, primero agrega una tienda!' 
          })
          this.router.navigate(['/tienda-form']);
        }

      },
      err => console.log(err)
    )
  }

}
