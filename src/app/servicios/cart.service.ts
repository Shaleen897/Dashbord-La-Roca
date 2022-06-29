import { Injectable, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from '../Components/login/login.service';
import { Pedido, Producto } from '../modelo/producto.module';
import { TarjetaProductComponent } from '../Components/tarjeta-product/tarjeta-product.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  uid: string;

constructor(private firestore: AngularFirestore,
            private loginService: LoginService) {

              this.loginService.getAuth().subscribe( auth => {
                
                  this.uid = auth.uid;
               
              })

              
             }





addToCart(data: Pedido): Promise<any>{
  return  this.firestore.collection(`users/${this.uid}/cart`).add(data);
}

getCart():Observable<any>{

  /*return  this.firestore.collection(`users/${this.uid}/cart`).snapshotChanges();*/
  return this.firestore.collection(`users/${this.uid}/cart`).snapshotChanges();
 }

 getCartLimpiar(){
  //return this.firestore.collection("users").doc('cart)').delete();
 // return this.firestore.collection(`users/${this.uid}/cart`).doc(data).delete();
 return this.firestore.collection(`users/${this.uid}/cart`).doc().delete();
 }

 eliminarProdCart(id:string): Promise <any>{
  return this.firestore.collection(`users/${this.uid}/cart`).doc(id).delete();
}
/*
eliminarCart(id:string): Promise <any>{
  return this.firestore.collection(`users`).doc(id).delete();
}*/

enviarPedido(data: Pedido): Promise<any>{
  return  this.firestore.collection(`users/${this.uid}/pedido`).add(data);
 }

 getPedido():Observable<any>{

  return this.firestore.collection(`users/${this.uid}/pedido/`).snapshotChanges();
 }

 
 enviarPedidoAdmin(data: Pedido): Promise<any>{
  return  this.firestore.collection(`pedidoAdmin`).add(data);
 }

 getPedidoAdmin():Observable<any>{

  return this.firestore.collection(`pedidoAdmin`).snapshotChanges();
 }

 getPagosOnline():Observable<any>{

  return this.firestore.collection(`ordenPagoOnline`).snapshotChanges();
 }

 setEstadoOnline(id:string, data: string): Promise<any>{
  return this.firestore.collection('ordenPagoOnline').doc(id).update(data);
}
 


}
