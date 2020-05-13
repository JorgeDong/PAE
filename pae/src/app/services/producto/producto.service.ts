import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly URL_API = 'http://localhost:3000/api/producto';

  productos = [];
  
  constructor(private http: HttpClient) { 
    this.obtenerProductos();
  }

  obtenerProductos(){
    return this.http.get(this.URL_API).subscribe((res:any)=>{
      res.forEach(element => {
        this.productos.push(element);
      });
    });
  }

  public ultimoProducto(){
    return this.http.get(this.URL_API + '/last');
  }

  subirProducto(producto){
    return this.http.post(this.URL_API, producto);
  }

  obtenerProductoId(id){
    console.log('dentro de service produto'+id)
   return this.http.get(this.URL_API+'/search/'+id);
  }


}
