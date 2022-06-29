import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido, Producto, ProductoPedido } from 'src/app/modelo/producto.module';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  
  pedidoadm: any[] = [];  

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

  uid:string;

  idCliente:string;
  

 constructor(private cartService: CartService,
             private aRoute: ActivatedRoute,
             private toastr: ToastrService,
             private loginService: LoginService,
             private _producService: ServicioScrService
            ){
              this.idCliente = this.aRoute.snapshot.paramMap.get('id');
 }

  ngOnInit() {
   
    this.getDetallesCliente();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.uid = auth.uid
      }else{
        this.isloggedIn = false;
      }

     
    })
  }


  pedidoDetalle: any = {
    cliente: ''
  }
  


  getDetallesCliente(){
    if(this.idCliente !== null){
    this._producService.getOneCliente(this.idCliente).subscribe(data =>{
      
      this.pedidoDetalle  = ({

        cliente: data.payload.data()['cliente']
      });
     
      
     /* this.cliente = ({
        nombre: data.payload.data()['nombre'],
        apellido: data.payload.data()['apellido'],
        email: data.payload.data()['email'],
        telefono: data.payload.data()['telefono'],
        direccion: data.payload.data()['direccion'],
        fecha: data.payload.data()['fecha'],
        uidd: data.payload.data()['uidd']
      })*/

     })
     console.log();
     console.log();
  }
}



















}
