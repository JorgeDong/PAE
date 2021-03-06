import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  //readonly URL_API = 'http://localhost:3000/api/imagen';
  URL_API = environment.apiUrl  + 'imagen';
  imagenes = [];


  constructor(private http: HttpClient) { 
  }

  obtenerImagenesIdProducto(id){
    return this.http.get(this.URL_API+'/producto/'+id);
  }

  

}
