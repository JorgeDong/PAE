import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../../../services/producto/producto.service';
import { SubastaService } from '../../../services/subasta/subasta.service';
import { Producto } from '../../../models/Producto';
import { Subasta } from '../../../models/Subasta';
import { User } from '../../../models/User';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service'
import { ImagenService } from '../../../services/imagen/imagen.service'
import { environment } from '../../../../environments/environment'



@Component({
  selector: 'app-editar-producto-dashboard',
  templateUrl: './editar-producto-dashboard.component.html',
  styleUrls: ['./editar-producto-dashboard.component.css']
})
export class EditarProductoDashboardComponent implements OnInit {

  ruta;
  image; 
  image1;
  image2;  
  src;
  src1;
  src2;

  idActual;

  urlImg;
  user: User;

  imagenes = [];
  productoActual;

  imagenPasada0;
  imagenPasada1;
  imagenPasada2;

  banderaImagen1;
  banderaImagen2;
  banderaImagen3;


  elementTiempo: HTMLElement;

  hiddenTiempo = false;
  hiddenEnvio = false;
  

  constructor(
    private http: HttpClient,
    private productoService: ProductoService,
    private subastaService: SubastaService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private imagenService: ImagenService
  ) {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user)
      },
      (err) => {
        console.log(err);
      }
    )
    
   }

  ngOnInit(): void {
    console.log('id')
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)

    this.productoService.obtenerProductoId(id).subscribe((res:any)=>{
      console.log('Producto')
      console.log(res);
      this.productoActual = res[0];
      this.idActual = res[0].idProducto;
      this.imagenService.obtenerImagenesIdProducto(res[0].idProducto).subscribe((res:any)=>{
        this.ruta = this.imagenService.URL_API;
        console.log('imagenes')
        console.log(res);
        this.imagenes = res;
        this.src = res[0].url;
        this.src1 = res[1].url;
        this.src2 = res[2].url;

        this.imagenPasada0 = res[0];
        this.imagenPasada1 = res[1];
        this.imagenPasada2 = res[2];

        this.banderaImagen1 = false;
        this.banderaImagen2 = false;
        this.banderaImagen3 = false;

      })
    });

    // Obtener el utlimo id unico de todos losproductos
    // this.productoService.ultimoProducto().subscribe( (res: any) =>{
    //   console.log(res);
    //    let aux = res as Producto[];
    //  //console.log(aux)
    //   this.idActual = res.idProducto;

    //   this.idActual ++;
    // });
  }


  obtenerImage(event,id){
    if(id == 1){

      //this.http.delete('http://localhost:3000/api/imagen/'+this.imagenPasada0._id).subscribe(res=>{
      this.http.delete(environment.apiUrl+'imagen/'+this.imagenPasada0._id).subscribe(res=>{
              this.banderaImagen1 = true;
            this.image = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = ()=>{
              this.src = reader.result;
            }
            reader.readAsDataURL(this.image);
            let formData = new FormData();
            formData.append("image",this.image);
            formData.append("idProducto_fk",this.idActual);
            formData.append("descripcion","Descripcion");

          //this.http.post('http://localhost:3000/api/imagen',formData)
          this.http.post(environment.apiUrl+'imagen',formData)
          .subscribe((res:any)=>{
            console.log('primera imagen')
            console.log(res.imagen.url);
            this.urlImg = res.imagen.url;
            console.log(this.urlImg)
          });
      });

    //   this.banderaImagen1 = true;
    //   this.image = event.target.files[0];
    //   let reader = new FileReader();
    //   reader.onloadend = ()=>{
    //     this.src = reader.result;
    //   }
    //   reader.readAsDataURL(this.image);
    //   let formData = new FormData();
    //   formData.append("image",this.image);
    //   formData.append("idProducto_fk",this.idActual);
    //   formData.append("descripcion","Descripcion");

    // this.http.post('http://localhost:3000/api/imagen',formData)
    // .subscribe((res:any)=>{
    //   console.log('primera imagen')
    //   console.log(res.imagen.url);
    //   this.urlImg = res.imagen.url;
    //   console.log(this.urlImg)
    // });

    }else if(id == 2){
      //this.http.delete('http://localhost:3000/api/imagen/'+this.imagenPasada1._id).subscribe(res=>{
      this.http.delete(environment.apiUrl + 'imagen/'+this.imagenPasada1._id).subscribe(res=>{
        
        this.banderaImagen2 = true;
        this.image1 = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = ()=>{
          this.src1 = reader.result;
        }
        reader.readAsDataURL(this.image1);
        let formData = new FormData();
        formData.append("image",this.image1);
        formData.append("idProducto_fk",this.idActual);
        formData.append("descripcion","Descripcion");

      this.http.post(environment.apiUrl + 'imagen',formData)
      .subscribe((res)=> console.log(res));

      })

    }else{

      this.http.delete(environment.apiUrl +'imagen/'+this.imagenPasada2._id).subscribe(res=>{
        this.banderaImagen3 = true;
        this.image2 = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = ()=>{
          this.src2 = reader.result;
        }
        reader.readAsDataURL(this.image2);
        let formData = new FormData();
        formData.append("image",this.image2);
        formData.append("idProducto_fk",this.idActual);
        formData.append("descripcion","Descripcion");
  
      this.http.post(environment.apiUrl + 'imagen',formData)
      .subscribe((res)=> console.log(res));
      })
    }


    // this.image = event.target.files[0];
    // console.log(event.target.files);
    // console.log(this.image);

    // let reader = new FileReader();
    // reader.onloadend = ()=>{
    //   if(id == 1){
    //     this.src = reader.result;
    //   }else if(id == 2){
    //     this.src1 = reader.result;
    //   }else{
    //     this.src2 = reader.result;
    //   }
    // }
    // reader.readAsDataURL(this.image);
  }


  uploadImage(form: NgForm){
    console.log(form.value);

    let formData = new FormData();
    formData.append("image",this.image);
    formData.append("image1",this.image1);
    formData.append("image2",this.image2);
    formData.append("desc",form.value.desc);
    console.log(formData);

    console.log(this.urlImg)

    let tiempoAux;
    let envioAux;

    if(form.value.tiempo == undefined){
      tiempoAux = this.productoActual.Tiempo;
    }else{
      tiempoAux = form.value.tiempo;
    }

    if(form.value.envio == undefined){
      envioAux =  this.productoActual.Envio;
    }else{
      envioAux = form.value.Envio;
    }

    // let nuevoProducto = new Producto(
    //                             //this.idActual,
    //                             1, // cambiar este categoria
    //                             this.user.id, // cambiar este es usuario
    //                             form.value.nombre,
    //                             form.value.marca,
    //                             form.value.accesorios,
    //                             form.value.descripcionP,
    //                             form.value.estado,
    //                             "valor",
    //                             form.value.puja,
    //                             tiempoAux,
    //                             "d",
    //                             "f",
    //                             envioAux,
    //                             this.src         
    //                           );

    let nuevoProducto = {
      idProducto: this.idActual,
      idCategoria_fk: 1, // cambiar este categoria
      idUsuario_fk: this.user.id, // cambiar este es usuario
      nombre: form.value.nombre,
      marca: form.value.marca,
      accesorios: form.value.accesorios,
      descripcion: form.value.descripcionP,
      estadoDelProducto:form.value.estado,
      Valor: "valor",
      PujaInicial: form.value.puja,
      Tiempo: tiempoAux,
      FechaInicio: "d",
      FechaFinal: "f",
      Envio: envioAux,
      Url: this.src         
    };

      console.log(nuevoProducto)
    // let nuevaSubasta =  new Subasta(
    //   this.idActual,
    //   1,
    //   form.value.puja,
    //   "1",
    //   "s",
    //   form.value.tiempo,
    //   form.value.descripcionS,
    //   form.value.envio
    // );

    // this.subastaService.subirSubasta(nuevaSubasta).subscribe(res => {
    //   console.log(res)
    // });
      
    this.productoService.actualizarProducto( this.productoActual._id,nuevoProducto).subscribe(res => {
      console.log(res)
      console.log('Actualizadoooooo')
      this.router.navigateByUrl('/subasta-detalle/'+this.idActual);
    });





  }


  editarTiempoSubasta(){
    this.hiddenTiempo = true;
    console.log('editar tiempo subasta')
    // this.elementTiempo = document.getElementById('tiempo_select') as HTMLElement;
    // if(this.elementTiempo.style.visibility == 'visible') {
    //   this.elementTiempo.style.visibility = 'hidden';
    // } else if(this.elementTiempo.style.visibility == 'hidden') {
    //   this.elementTiempo.style.visibility = 'visible';
    // }
  }

  editarEnvioSubasta(){
    this.hiddenEnvio = true;
    console.log('editar tiempo subasta')
  }


}
