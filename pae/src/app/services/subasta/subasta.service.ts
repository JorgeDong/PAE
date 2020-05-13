import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subasta } from 'src/app/models/Subasta';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {
  readonly URL_API = 'http://localhost:3000/api/';

  subastas = [];
  prodcutos = [];
  imagenes = [];
  pujas = [];

  constructor(private http: HttpClient) { 
    this.http.get(this.URL_API + 'subasta').subscribe((res: any) => {
      res.forEach(element => {
        this.subastas.push(element);
      });
    });

    this.http.get(this.URL_API + 'producto').subscribe((res: any) => {
      res.forEach(element => {
        this.prodcutos.push(element);
      });

      this.http.get(this.URL_API + 'imagen').subscribe((res: any) => {
        res.forEach(element => {
          this.imagenes.push(element);
        });
    });

    this.http.get(this.URL_API + 'puja').subscribe((res: any) => {
      res.forEach(element => {
        this.pujas.push(element);
      });
  });


  });

  



  }

  // inicializar(){
  //   this.obtenerSubastas();
  //   this.obtenerProductos();
  //   this.obtenerImagenes();
  //   this.obtnerPujas();
  // }

  // obtenerSubastas(){
  //   this.http.get(this.URL_API + 'subasta').subscribe((res: any) => {
  //       res.forEach(element => {
  //         this.subastas.push(element);
  //       });
  //   });
  // }

  // obtenerProductos(){
  //   this.http.get(this.URL_API + 'producto').subscribe((res: any) => {
  //     res.forEach(element => {
  //       this.prodcutos.push(element);
  //     });
  // });
  // }

  obtenerImagenes(){
    this.http.get(this.URL_API + 'imagen').subscribe((res: any) => {
      res.forEach(element => {
        this.imagenes.push(element);
      });
  });
  }

  obtnerPujas(){
    this.http.get(this.URL_API + 'puja').subscribe((res: any) => {
      res.forEach(element => {
        this.pujas.push(element);
      });
  });
  }


  subirSubasta(subasta){
    return this.http.post(this.URL_API  + 'subasta',subasta);
  }

  countByUserId(ID):Observable<any>{
    return this.http.get(`http://localhost:3000/api/subasta`).pipe(
      map( (data:Subasta[]) => {
        let filteredData = data.filter(data => data.idUsuario_fk == ID)
        return filteredData.length;
        }
      )
    )
  }
  getByUserId(ID):Observable<any>{
    return this.http.get(`http://localhost:3000/api/subasta`).pipe(
      map( (data:Subasta[]) => {
        let filteredData = data.filter(data => data.idUsuario_fk == ID)
        return filteredData;
        }
      )
    )
  }

}
