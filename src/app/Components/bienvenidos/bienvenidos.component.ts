import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-bienvenidos',
  templateUrl: './bienvenidos.component.html',
  styleUrls: ['./bienvenidos.component.css']
})
export class BienvenidosComponent implements OnInit {

  productos: any[] = [];  
  usersAdm: any[] = [];
  pedidoadm: any[] =[];

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;

  uid:string;

  adminName: string;
    constructor(private _producService: ServicioScrService,
      private toastr: ToastrService,
      private loginService: LoginService,
      private cartService: CartService) { }


  ngOnInit() {

  this.getProductos()
  this.getperfilAdm();
  this.getPedidoAdmin();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.uid = auth.uid;
      }else{
        this.isloggedIn = false;
      }

      if(this.loggedInUser == 'blockindustrialspm@outlook.com' && this.uid == 'CmMTSVoYkzUOFtWQLga6zv9RrNy2'){
        this.adminName = 'Jesus Rivera';
        this.isloggedInAdm = true;
      }else{
        this.isloggedInAdm = false;
      }
    })
  }


  getProductos(){
    this._producService.getProductos().subscribe( data=> {
      this.productos = [];
      data.forEach(element => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log()
    });
  }


  getperfilAdm(){
    this._producService.getClienteAdm().subscribe( data=> {
      this.usersAdm = [];
      data.forEach(element => {
        this.usersAdm.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
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


  eliminarProducto(id:string){
    this._producService.eliminarProducto(id).then(() => {

      this.toastr.success('El Producto fue Eliminado', 'Elimininado');
      
    }).catch(error =>{
      this.toastr.error('El Producto no fue Eliminado correctamente', 'Error');
        console.log(error)
      })
  }
}





