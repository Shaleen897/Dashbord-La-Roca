import { Component, OnInit } from '@angular/core';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
 contactos: any[] = [];
 isloggedIn: boolean;
 loggedInUser: string;
 isloggedInAdm: boolean;
 uid:string;
  constructor(private _producService: ServicioScrService,
              private loginService: LoginService) {
   
  }

  ngOnInit() {
    this.getContactos();


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

  getContactos(){
    this._producService.getContactos().subscribe( data=> {
      this.contactos = [];
      data.forEach(element => {
        this.contactos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
       console.log()
    });
  }

  eliminarContacto(id:string){
    this._producService.eliminarContacto(id).then(() => {
      
      
    }).catch(error =>{
        console.log(error)
      })
  }

  
  
}
