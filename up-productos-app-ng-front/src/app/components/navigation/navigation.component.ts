import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user:firebase.User
  nombreEmail: string

  constructor(private afAuth: AngularFireAuth, private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit() {
    this.afAuth.user.subscribe((usuario)=>{
      this.user=usuario
      if(this.user){
        if(this.user.displayName){
          this.nombreEmail = this.user.displayName 
        }else{
          this.nombreEmail = this.user.email
        }
        console.log("Usuario: "+ this.nombreEmail)
      }else{
        console.log("¡Sin sesión!")
      }
    })
  }
/*
  logout() {
    this.spinner.show()
    this.afAuth.auth.signOut();

    setTimeout(() => {
      this.spinner.hide() 
      this.router.navigate(['/login'])


    }, 500);
  }*/

  logout(){
    Swal.fire({
      title: `¡Atención!`,
      text: "¿Estás seguro que deseas salir?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aeaeae',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        /*si dan clic en si, eliminar */

        this.spinner.show()
        this.afAuth.auth.signOut();
    
        setTimeout(() => {
          this.spinner.hide() 
          this.router.navigate(['/login'])  
        }, 500);
  
      }
    })
    }

}
