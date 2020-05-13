import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subasta } from 'src/app/models/Subasta';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  filteredData: Subasta[];
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

  countSoldProductsByUserId(ID):Observable<any>{
    return this.http.get(this.URL_API).pipe(
      map( (data:Subasta[]) => {
        let filteredData = data.filter(data => data.idUsuario_fk == ID)
        return filteredData.length;
        }
      )
    )
  }

  SoldProductsByUserId(ID):Observable<any>{
    return this.http.get(this.URL_API).pipe(
      map( (data:Subasta[]) => {
        let filteredData = data.filter(data => data.idUsuario_fk == ID)
        console.log(filteredData)
        return filteredData;
        }
      )
    )
  }

}
