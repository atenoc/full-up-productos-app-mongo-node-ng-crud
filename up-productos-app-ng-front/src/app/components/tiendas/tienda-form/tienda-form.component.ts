import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-tienda-form',
  templateUrl: './tienda-form.component.html',
  styleUrls: ['./tienda-form.component.css']
})
export class TiendaFormComponent implements OnInit {

  file:File
  photoSelected: string | ArrayBuffer
  uid:string

  constructor(private tiendaService: TiendaService, private router: Router, 
    public afAuth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    /* Validando sesión */
    this.afAuth.user.subscribe((usuario)=>{
      if(usuario){
        this.uid=usuario.uid
      }
    })
  }

  fotoSeleccionada(event:HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];

      //vista previa
      const reader = new FileReader()
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  crearTienda(nombre: HTMLInputElement, descripcion: HTMLTextAreaElement, telefono: HTMLInputElement, 
    direccion: HTMLInputElement){
    this.spinner.show()
    this.tiendaService.createTienda(nombre.value, descripcion.value, telefono.value, direccion.value, this.file, this.uid)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/tiendas'])
          this.spinner.hide()
          //Swal.fire('Información',`Cliente ${cliente.nombre} creado con éxito`,'success')
          Swal.fire('Genial',`Has creado tu tienda digital`,'success')

      }, 
        err => {
          console.log(err)
          this.spinner.hide()
      });

    return false;
  }

}
