import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductoDetalleComponent } from './components/productos/producto-detalle/producto-detalle.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { ProductosComponent } from './components/productos/producto-list/productos.component';
import { TiendaDetalleComponent } from './components/tiendas/tienda-detalle/tienda-detalle.component';
import { TiendaFormComponent } from './components/tiendas/tienda-form/tienda-form.component';
import { TiendasComponent } from './components/tiendas/tienda-list/tiendas.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuariosComponent } from './components/usuarios/usuario-list/usuarios.component';


const routes: Routes = [
  {path:'', component: ProductosComponent},
  {path:'productos', component: ProductosComponent},
  {path:'producto-form', component: ProductoFormComponent},
  {path:'producto-detalle/:id', component: ProductoDetalleComponent},
  {path:'tiendas', component: TiendasComponent},
  {path:'tienda-form', component: TiendaFormComponent},
  {path:'tienda-detalle/:id', component: TiendaDetalleComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'usuario-form', component: UsuarioFormComponent},
  {path:'usuario-detalle/:id', component: UsuarioDetalleComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
