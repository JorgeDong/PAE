import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient
  ) { }

  //readonly URL_API = 'http://localhost:3000/api/comentario';
  URL_API = environment.apiUrl;


  obtenerComentariosPorIdUsuario(id){
    return this.http.get(this.URL_API+'/usuario/'+id);
  }

  subirComentario(comentario){
    return this.http.post(this.URL_API, comentario);
  }


}
