import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from '../../../modelo/configuracion.modelo';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor( private router: Router, private configuracionServicio: ConfiguracionService) { }

  ngOnInit() {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) =>{
        this.permitirRegistro = configuracion.permitirRegistro;
      })
  }


permitirRegistro = false;


guardar(){
 let configuracion = {permitirRegistro: this.permitirRegistro};
 this.configuracionServicio.modificarConfiguracion(configuracion);
 this.router.navigate(['/']);
}






}
