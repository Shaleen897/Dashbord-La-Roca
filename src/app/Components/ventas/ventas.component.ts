import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modelo/user.module';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

  clientes: any[] = [];
  pedido: any[] = [];
  pedidoadm: any[] = [];
  
  admin: string = 'Listado de Ventas';
  user: string = 'Listado de compras';

  
  estadoE:string = 'Enviado'

  id:string;
  uid:string;
   
  constructor(private _producService: ServicioScrService,
              private cartService: CartService,
             private loginService: LoginService,
             private aRoute: ActivatedRoute,) {
              
              }

  ngOnInit() {

    this.getPedido();
    this.getPedidoAdmin();
    
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.uid = auth.uid;
      }else{
        this.isloggedIn = false;
      }

      if(this.loggedInUser == 'blockindustrialspm@outlook.com' && this.uid == 'CmMTSVoYkzUOFtWQLga6zv9RrNy2'){
        this.isloggedInAdm = true;
      }else{
        this.isloggedInAdm = false;
      }
    })

    

  }
  

  getPedido(){

    this.cartService.getPedido().subscribe( data => {
      this.pedido = [];
      data.forEach(shopping => {
        this.pedido.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
       console.log();

    });

  }

  getPedidoAdmin(){

    this.cartService.getPedidoAdmin().subscribe( data => {
      this.pedidoadm = [];
      data.forEach(shopping => {
        this.pedidoadm.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
       console.log();

    });

  }


  getperfil(){
    this._producService.getCliente().subscribe( data=> {
      this.clientes = [];
      data.forEach(element => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
       /* console.log();*/
    });
  }




}



















































































