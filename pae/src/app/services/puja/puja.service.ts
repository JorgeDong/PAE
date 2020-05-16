import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PujaService {
  //readonly URL_API = 'http://localhost:3000/api/puja';
  URL_API = environment.apiUrl + 'puja';
  constructor(private http: HttpClient) { }
  


  subirPuja(puja){
    return this.http.post(this.URL_API, puja);
  }

  obtenerPujasPorIdProducto(id){
    return this.http.get(this.URL_API+'/producto/'+id);
  }
}
