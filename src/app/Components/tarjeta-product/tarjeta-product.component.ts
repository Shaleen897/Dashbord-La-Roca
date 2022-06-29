import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioScrService } from 'src/app/servicioScr.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tarjeta-product',
  templateUrl: './tarjeta-product.component.html',
  styleUrls: ['./tarjeta-product.component.css']
})
export class TarjetaProductComponent implements OnInit {

  
  crearProducto: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo: string = 'Agregar Producto';

 /* uploadPercent: Observable<number>;*/
  urlImage: Observable<string>;
  imagen: any;

  constructor(private fb: FormBuilder,
              private _proService: ServicioScrService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService,
              private FireStorage: AngularFireStorage) {
                
     this.crearProducto = this.fb.group({
      codigo: ['', Validators.required],
      departamento: ['', Validators.required],
       producto: ['', Validators.required],
       img: ['', Validators.required],
       precio: ['', Validators.required],
       descuento: [''],
       existencia: ['', Validators.required],
       descripcion:['', Validators.required],
     })
     
     this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.esEditar();
  }

  agregarEditarProducto(){
    this.submitted = true;

   
    if(this.id === null){
      this.agregarProducto();
    }else{
      this.editarProducto();
    }

    console.log(
      this.crearProducto.valid
 )
   
  }

 

  agregarProducto(){


    const producto: any ={
      departamento: this.crearProducto.value.departamento,
      codigo: this.crearProducto.value.codigo,
      producto: this.crearProducto.value.producto,
      precio: this.crearProducto.value.precio,
      descuento: this.crearProducto.value.descuento,
      existencia: this.crearProducto.value.existencia,
      descripcion: this.crearProducto.value.descripcion,
      img: this.crearProducto.value.img,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._proService.agregarProducto(producto).then(() =>{
      this.loading = false;
      this.crearProducto.reset();
      this.toastr.success('El Producto Fue agregado', 'Procesos');
      //this.router.navigate(['./productos'])
    }).catch(error =>{
      this.loading = false;
      console.log(error)
      this.toastr.error('El Producto no fue agregado correctamente', 'Error');
    })

  }


  editarProducto(){
    const producto: any ={
      departamento: this.crearProducto.value.departamento,
      codigo: this.crearProducto.value.codigo,
      producto: this.crearProducto.value.producto,
      precio: this.crearProducto.value.precio,
      descuento: this.crearProducto.value.descuento,
      existencia: this.crearProducto.value.existencia,
      descripcion: this.crearProducto.value.descripcion,
      img: this.crearProducto.value.img,
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._proService.actualizarProductos(this.id, producto).then(() =>{
      this.loading = false;
      this.toastr.success('El Producto Fue Actualizado', 'Procesos');
      this.router.navigate(['./productos'])
    }).catch(error =>{
      this.loading = false;
      console.log(error)
      this.toastr.error('El Producto no fue editado correctamente', 'Error');
    })
  }
  
  esEditar(){
   if(this.id !== null){
     this.loading = true;
     this.titulo = 'Editar Producto'
     this._proService.getProducto(this.id).subscribe(data =>{
       
      this.loading = false;
      
      this.crearProducto.setValue({
         departamento: data.payload.data()['departamento'],
         codigo: data.payload.data()['codigo'],
         producto: data.payload.data()['producto'],
         precio: data.payload.data()['precio'],
         descuento: data.payload.data()['descuento'],
         existencia: data.payload.data()['existencia'],
         descripcion: data.payload.data()['descripcion'],
         img: data.payload.data()['img']
       })
     })
   }
  }




onUploadImg(e){
  console.log();

  const idg = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath = `uploads/${idg}`; 
  const ref = this.FireStorage.ref(filePath);
  const task = this.FireStorage.upload(filePath, file);
  /*this.uploadPercent = task.percentageChanges();*/
  task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe( res =>{
    const downloadURL = res;
    
    return downloadURL;
  });

}





}


