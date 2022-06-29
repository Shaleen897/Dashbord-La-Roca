import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/modelo/producto.module';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

 

  productos: any[] = [];  

  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  nombre: string;
  userid:string;
  uid:string;
  constructor(private _producService: ServicioScrService,
              private toastr: ToastrService,
              private loginService: LoginService
              ) {
              
   }

  ngOnInit(): void {
    this.getProductos()

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


  getProductos(){
    this._producService.getProductos().subscribe( data=> {
      this.productos = [];
      data.forEach(element => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
       console.log()
    });
    
  }

  eliminarProducto(id:string){
    const confirmar = confirm('Esta seguro')
    if(confirmar){
    this._producService.eliminarProducto(id).then(() => {

      this.toastr.success('El Producto fue Eliminado', 'Elimininado');
      
    }).catch(error =>{
      this.toastr.error('El Producto no fue Eliminado correctamente', 'Error');
        console.log(error)
      })
    }

  }



  

  buscarProducto(){
    
    if(this.nombre){
      this._producService.buscarProducto(this.nombre).subscribe(
        (prod: Producto[]) => {
         
          this.productos = prod;
        }
      )
    }
  }


}
