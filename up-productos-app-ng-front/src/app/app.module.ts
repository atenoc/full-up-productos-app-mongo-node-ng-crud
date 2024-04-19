import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuario-list/usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { TiendasComponent } from './components/tiendas/tienda-list/tiendas.component';
import { TiendaFormComponent } from './components/tiendas/tienda-form/tienda-form.component';
import { TiendaDetalleComponent } from './components/tiendas/tienda-detalle/tienda-detalle.component';
import { ProductosComponent } from './components/productos/producto-list/productos.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductoDetalleComponent } from './components/productos/producto-detalle/producto-detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioFormComponent,
    UsuarioDetalleComponent,
    TiendasComponent,
    TiendaFormComponent,
    TiendaDetalleComponent,
    ProductosComponent,
    ProductoFormComponent,
    ProductoDetalleComponent,
    NavigationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,        
    FormsModule,
    NgxSpinnerModule,          //spinner
    BrowserAnimationsModule,    //para las animaciones
    AngularFireModule.initializeApp(environment.firebase)  // firebase
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
