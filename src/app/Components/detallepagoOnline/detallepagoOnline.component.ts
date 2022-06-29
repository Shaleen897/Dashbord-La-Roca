import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/servicios/cart.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-detallepagoOnline',
  templateUrl: './detallepagoOnline.component.html',
  styleUrls: ['./detallepagoOnline.component.css']
})
export class DetallepagoOnlineComponent implements OnInit {

  fullinfoid:string;

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
   uid:string;

   
  add: boolean = false;
  uiduserestado: string;

  constructor(private cartService: CartService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private loginService: LoginService,
    private _producService: ServicioScrService) { 

    this.fullinfoid = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getfullinfo();

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
        this.uid = auth.uid
      }else{
        this.isloggedIn = false;
      }

     
    })
  }

  fullinfo: any = {
    ciudad: '',
    direccion: '',
    email: '',
    fechaCreacion: '',
    mescard: '',
    nombre: '',
    pueblo: '',
    uids: '',
    yearcard: '',
    orden: '',
    cardnumber: '',
    cvv: '',
    codigozip: '',
    namecard: ''
  }

  getfullinfo(){
    if(this.fullinfoid !== null){
    this._producService.getOnefullInfo(this.fullinfoid).subscribe(data =>{
      
        this.fullinfo  = ({
          direccion: data.payload.data()['direccion'],
          cardnumber: data.payload.data()['cardnumber'],
          email: data.payload.data()['email'],
          fechaCreacion: data.payload.data()['fechaCreacion'],
          mescard: data.payload.data()['mescard'],
          nombre: data.payload.data()['nombre'],
          pueblo: data.payload.data()['pueblo'],
          ciudad: data.payload.data()['ciudad'],
          uids: data.payload.data()['uids'],
          yearcard: data.payload.data()['yearcard'],
          cvv: data.payload.data()['cvv'],
         orden: data.payload.data()['orden'],
         codigozip: data.payload.data()['codigozip'],
         namecard: data.payload.data()['namecard'],
         estado: data.payload.data()['estado']
        });
     
      

      })
     console.log();
   }
 }


 addEstado(){
   
  this.add = true
/*  console.log(index);*/

}

 estadoDePago(estado:string){

  let updateEstado = estado;
  const data: any ={
     [`orden.estado`]: updateEstado
    
  }

  this.cartService.setEstadoOnline(this.fullinfoid, data).then(() =>{
    this.add = false;
    this.toastr.success('Estado Actualizado');
   // this.router.navigate(['/pagosonline'])
   })


  
}

}
