import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Tienda } from 'src/app/models/Tienda';
import { ProductoService } from 'src/app/services/producto.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  user:firebase.User
  tiendas: Tienda[] = [];
  agregarRender: boolean = true
  
  constructor(private tiendaService: TiendaService, private router: Router,  
    private afAuth: AngularFireAuth) {}

  ngOnInit() {

  /* Validando sesión */
    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        //console.log("Usuario: "+ this.user.email)

      }else{
        //console.log("¡Sin sesión!")
      }
    })

    console.log("carga tiendas...")

    this.tiendaService.getTiendas()
    .subscribe(
      res => {
        this.tiendas = res;
        console.log(this.tiendas.length)
        if(this.tiendas.length>0){
          this.agregarRender = false
          this.tiendaService.existeTienda = true
        }
      },
      err => console.log(err)
    )
  }

  selectedCard(id: string) {
    this.router.navigate(['/tienda-detalle', id]);
  }

  /*
  ngDoCheck(){
  }
  */

}
