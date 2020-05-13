import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly URL_API = 'http://localhost:3000/api/producto';
  
  constructor(private http: HttpClient) { }

  obtenerProductos(){
    return this.http.get(this.URL_API);
  }

  public ultimoProducto(){
    return this.http.get(this.URL_API + '/last');
  }

  subirProducto(producto){
    return this.http.post(this.URL_API, producto);
  }
<<<<<<< HEAD


=======
>>>>>>> a801d4fe7e5758a577f0d4d7a9b7ea2531342909
}
