import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

//Modulos Firebase
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


//toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ProductosComponent } from './Components/productos/productos.component';
import { BienvenidosComponent } from './Components/bienvenidos/bienvenidos.component';
import { ServicioScrService } from './servicioScr.service';
import { TarjetaProductComponent } from './Components/tarjeta-product/tarjeta-product.component';
import { ContactosComponent } from './Components/contactos/contactos.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion/configuracion.component';
import { ConfiguracionService } from './servicios/configuracion.service';
import { LoginService } from './Components/login/login.service';
import { AuthGuard } from './Components/guardian/auth.guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SearchComponent } from './Components/clientedetalle/search.component';
import { PerfilClienteComponent } from './Components/perfil-cliente/perfil-cliente.component';
import { VentasComponent } from './Components/pre-ventas/ventas.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { CategoriasService } from './servicios/categorias.service';

import { AuthService } from './servicios/auth.service';
import { CartService } from './servicios/cart.service';
import { PagosonlineComponent } from './Components/pagosonline/pagosonline.component';
import { DetallepagoOnlineComponent } from './Components/detallepagoOnline/detallepagoOnline.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductosComponent,
    BienvenidosComponent,
    TarjetaProductComponent,
    ContactosComponent,
    LoginComponent,
    RegistroComponent,
   ConfiguracionComponent,
   SearchComponent,
   PerfilClienteComponent,
   VentasComponent,
   PagosonlineComponent,
   DetallepagoOnlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CarouselModule,
    HttpClientModule
  ],
  providers: [
    ServicioScrService,
    ConfiguracionService,
    LoginService,
    AuthGuard,
    CategoriasService,
    AuthService,
    CartService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
