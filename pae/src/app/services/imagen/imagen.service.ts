import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenes = [];

  readonly URL_API = 'http://localhost:3000/api/imagen';
  constructor(private http: HttpClient) { 
  }

  obtenerImagenesIdProducto(id){
    return this.http.get(this.URL_API+'/producto/'+id);
  }

  

}
