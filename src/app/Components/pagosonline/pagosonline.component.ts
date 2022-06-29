import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/modelo/producto.module';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-pagosonline',
  templateUrl: './pagosonline.component.html',
  styleUrls: ['./pagosonline.component.css']
})
export class PagosonlineComponent implements OnInit {

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  uid:string;
  admin:string = 'Pagos Online';
  pagosOnline: any[] = [];
  id:string;
  
  constructor(private _producService: ServicioScrService,
    private cartService: CartService,
   private loginService: LoginService,
   private aRoute: ActivatedRoute,) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {

    this.getPagosOnline();

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


getPagosOnline(){

    this.cartService.getPagosOnline().subscribe( data => {
      this.pagosOnline = [];
      data.forEach(shopping => {
        this.pagosOnline.push({
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data()
        })
      });
       console.log();

    });

  }




/*Buscar Estado categoria*/
estadoPagadaempresa(){
  this._producService.buscarPagadaEmpresap().subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}


estadoPagadaonline(){
  this._producService.buscarPagadaOnlinep().subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}

estadoEspera(){
  this._producService.buscarEsperap().subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}

estadoEnviada(){
  this._producService.buscarEnviadap().subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}

estadoCancelada(){
  this._producService.buscarCanceladap().subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}
orden:string;
estadoEnproceso(){
  this._producService.buscarEnprocesop(this.orden).subscribe(
    (prod: Producto[]) => {
     
      this.pagosOnline = prod;
    }
  )
}






}
