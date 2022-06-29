import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidosComponent } from './Components/bienvenidos/bienvenidos.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { ContactosComponent } from './Components/contactos/contactos.component';
import { TarjetaProductComponent } from './Components/tarjeta-product/tarjeta-product.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { AuthGuard} from './Components/guardian/auth.guard';
import { ConfiguracionComponent } from './Components/configuracion/configuracion/configuracion.component';
import { SearchComponent } from './Components/clientedetalle/search.component';
import { PerfilClienteComponent } from './Components/perfil-cliente/perfil-cliente.component';
import { VentasComponent } from './Components/pre-ventas/ventas.component';
import { PagosonlineComponent } from './Components/pagosonline/pagosonline.component';
import { DetallepagoOnlineComponent } from './Components/detallepagoOnline/detallepagoOnline.component';

const routes: Routes = [
  { path: 'bienvenido', component: BienvenidosComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'tarjetas', component: TarjetaProductComponent, canActivate: [AuthGuard] },
  { path: 'editarTarjeta/:id', component: TarjetaProductComponent, canActivate: [AuthGuard] },
  { path: 'contactos', component: ContactosComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'infoperfil', component: PerfilClienteComponent, canActivate: [AuthGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard]  },
  { path: 'ventas/:id', component: VentasComponent, canActivate: [AuthGuard]  },
  { path: 'modal/:id', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'detallepago/:id', component: DetallepagoOnlineComponent, canActivate: [AuthGuard] },
  { path: 'pagosonline', component: PagosonlineComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'bienvenido', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
