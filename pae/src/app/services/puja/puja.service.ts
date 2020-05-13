import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PujaService {

  constructor(private http: HttpClient) { }
  readonly URL_API = 'http://localhost:3000/api/puja';


  subirPuja(puja){
    return this.http.post(this.URL_API, puja);
  }

  obtenerPujasPorIdProducto(id){
    return this.http.get(this.URL_API+'/producto/'+id);
  }
}
