import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from './Components/login/login.service';
import { Producto } from './modelo/producto.module';

@Injectable({
  providedIn: 'root'
})
export class ServicioScrService {

  uid:string;
  productoDoc: AngularFirestoreDocument<any>;
  productos: Observable<any[]>;
  producto: Observable<any>;

constructor(private fireStore: AngularFirestore,
            private _loginService: LoginService) {
  this._loginService.getAuth().subscribe( auth => {
    if(auth){
      this.uid = auth.uid;
    }else{
    }
   
  })
}

agregarProducto(producto: any): Promise<any>{
  return this.fireStore.collection('productos').add(producto);
}


getProductos(): Observable<any>{
  return this.fireStore.collection('productos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
}

eliminarProducto(id:string): Promise <any>{
  return this.fireStore.collection('productos').doc(id).delete();
}

getProducto(id:string): Observable<any>{
  return this.fireStore.collection('productos').doc(id).snapshotChanges();
}

actualizarProductos(id:string, data: string): Promise<any>{
  return this.fireStore.collection('productos').doc(id).update(data);
}

agregarContacto(contacto: any): Promise<any>{
  return this.fireStore.collection('contactos').add(contacto);
}

getContactos(): Observable<any>{
  return this.fireStore.collection('contactos', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
}


eliminarContacto(id:string): Promise <any>{
  return this.fireStore.collection('contactos').doc(id).delete();
}


agregarCliente(cliente: any): Promise<any>{
  return this.fireStore.collection(`users/${this.uid}/clientes`).add(cliente);
}

getCliente(): Observable<any>{
  return this.fireStore.collection(`users/${this.uid}/clientes`, ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
}

agregarClienteAdm(cliente: any): Promise<any>{
  return this.fireStore.collection(`clientes`).add(cliente);
}

getClienteAdm(): Observable<any>{
  return this.fireStore.collection(`clientes`, ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
}

buscarProducto(nombre: string){
     return this.fireStore.collection('productos',ref => ref.where('producto','==', nombre)).valueChanges();

  
  }

  buscarPrecio(operador: '<' | '>' | '==', precio: number){
    return this.fireStore.collection('productos',ref => ref.where('precio', operador, precio)).valueChanges();

 
 }
  departamentos(nombreDepart: string){
    return this.fireStore.collection('productos',ref => ref.where('departamento','==', nombreDepart)).valueChanges();

 
 }

 buscarEmail(emails: string){
  return this.fireStore.collection('clientes',ref => ref.where('email','==', emails)).valueChanges();


}


getOneProducto(id:string): Observable<any>{
  return this.fireStore.collection('productos').doc(id).snapshotChanges();
}


getOneCliente(id:string): Observable<any>{
  return this.fireStore.collection('pedidoAdmin').doc(id).snapshotChanges();
}

getOnefullInfo(id:string): Observable<any>{
  return this.fireStore.collection('ordenPagoOnline').doc(id).snapshotChanges();
}

setEstado(id:string, data: string): Promise<any>{
  return this.fireStore.collection('pedidoAdmin').doc(id).update(data);
}


pagadaempresa:string = 'Pagada Empresa';
Espera:string = 'Espera';
pagadaonline:string = 'Pagada en linea';
Cancelada:string = 'Cancelada';
Enviada:string = 'Enviada';
Enproceso:string = 'En Proceso';

/*Busquedas de estados Pre-Orden*/

buscarEspera(){
  return this.fireStore.collection('pedidoAdmin',ref => ref.where('estado','==', this.Espera)).valueChanges();
}
buscarPagadaOnline(){
  return this.fireStore.collection('pedidoAdmin',ref => ref.where('estado','==', this.pagadaonline)).valueChanges();

}
buscarPagadaEmpresa(){
  return this.fireStore.collection('pedidoAdmin',ref => ref.where('estado','==', this.pagadaempresa)).valueChanges();

}
buscarEnviada(){
  return this.fireStore.collection('pedidoAdmin',ref => ref.where('estado','==', this.Enviada)).valueChanges();
}
buscarCancelada(){
  return this.fireStore.collection('pedidoAdmin',ref => ref.where('estado','==', this.Cancelada)).valueChanges();

}
buscarEnproceso(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('estado','==', this.Enproceso)).valueChanges();

}


/* Buscar estado Orden Online*/

buscarEsperap(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.estado','==', this.Espera)).valueChanges();
}
buscarPagadaOnlinep(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.estado','==', this.pagadaonline)).valueChanges();

}
buscarPagadaEmpresap(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.estado','==', this.pagadaempresa)).valueChanges();

}
buscarEnviadap(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.estado','==', this.Enviada)).valueChanges();
}
buscarCanceladap(){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.estado','==', this.Cancelada)).valueChanges();

}
buscarEnprocesop(orden:string){
  return this.fireStore.collection('ordenPagoOnline',ref => ref.where('orden.ordenNum','==', orden)).valueChanges();

}
}
