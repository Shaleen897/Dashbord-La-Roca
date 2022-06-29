import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';
import { Producto } from 'src/app/modelo/producto.module';

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
  
  admin: string = 'Pre-Ventas';

  add: number = -1;
  
  id:string;
  uid:string;

  uiduserestado: string;
   
  constructor(private _producService: ServicioScrService,
              private cartService: CartService,
             private loginService: LoginService,
             private aRoute: ActivatedRoute,
             private toastr: ToastrService,
             private router: Router,) {

               this.id = this.aRoute.snapshot.paramMap.get('id');
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


addEstado(index:number){
  this.add = +index;
/*  console.log(index);*/

}




estadoDePago(estado:string){

  let updateEstado = estado;
  const data: any ={
    estado: updateEstado
  
  }

  this._producService.setEstado(this.id, data).then(() =>{
    this.add = -1;
    this.toastr.success('Estado Actualizado');
    this.router.navigate(['/ventas'])
   })


  
}








/*Buscar Estado categoria*/
estadoPagadaempresa(){
  this._producService.buscarPagadaEmpresa().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}


estadoPagadaonline(){
  this._producService.buscarPagadaOnline().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}

estadoEspera(){
  this._producService.buscarEspera().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}

estadoEnviada(){
  this._producService.buscarEnviada().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}

estadoCancelada(){
  this._producService.buscarCancelada().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}

estadoEnproceso(){
  this._producService.buscarEnproceso().subscribe(
    (prod: Producto[]) => {
     
      this.pedidoadm = prod;
    }
  )
}

}



















































































