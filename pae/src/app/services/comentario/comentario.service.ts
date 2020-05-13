import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private http: HttpClient
  ) { }

  readonly URL_API = 'http://localhost:3000/api/comentario';


  obtenerComentariosPorIdUsuario(id){
    return this.http.get(this.URL_API+'/usuario/'+id);
  }


}
