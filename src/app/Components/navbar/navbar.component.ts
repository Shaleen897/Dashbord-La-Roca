import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';
import { Producto } from 'src/app/modelo/producto.module';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  productos: any[] = [];  
  
  isloggedIn: boolean;
  loggedInUser: string;
  isloggedInAdm: boolean;
  admUser:string = 'blockindustrialspm@outlook.com';
  admuser: string ='BlockIndustrialSPM@outlook.com';
  nombre:string;
  uidadm:string;
  admin: string = 'Ventas';
  user: string = 'Compras';
  
  constructor(private loginService: LoginService,
                private router: Router,
                private toastr: ToastrService,
                private cartService: CartService,
                private afs: AngularFirestore,
                private _departaCateg: CategoriasService) { 
  

  }

  ngOnInit() {

   
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isloggedIn = true;
        this.loggedInUser = auth.email;
        this.uidadm = auth.uid;
      }else{
        this.isloggedIn = false;
      }

      if(this.loggedInUser == this.admUser || this.admuser && this.uidadm == 'CmMTSVoYkzUOFtWQLga6zv9RrNy2'){
        this.isloggedInAdm = true;
      }else{
        this.isloggedInAdm = false;
        this.loginService.logout();
      }
    })

  }
  


  logout(){
    this.loginService.logout();
    this.isloggedIn = false;
    this.router.navigate(['/login']);
    this.toastr.success('A Salido De Su Cuenta ','Log Out');
    window.location.reload();
    
  }

  









}






