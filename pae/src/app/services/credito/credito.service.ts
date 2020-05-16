import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credito } from 'src/app/models/Credito';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  filteredData : Credito[];

  constructor(private http: HttpClient) { }

  getAllCreditos(): Observable<any>{
    return this.http.get('http://localhost:3000/api/credito').pipe(
      map((data: Credito[]) => {
        console.log(data);
        return data;
      })
    )
  }
  getCreditoByID(ID): Observable<any>{
    return this.http.get('http://localhost:3000/api/credito').pipe(
      map((data: Credito[]) => {
        const filteredData = data.filter( dataCredito => dataCredito.idUsuario_fk === ID);
        return filteredData[0];
      })
    );
  }
  updateCredito(ID, idCredito, idUsuario_fk, CantidadCredito, moneda):Observable<any>{
    return this.http.put(`http://localhost:3000/api/credito/update/${ID}`, {idCredito:idCredito, idUsuario_fk:idUsuario_fk, 
    CantidadCredito:CantidadCredito, moneda:moneda}).pipe(
      map( (data:any) => {
        console.log(data);
        return data;
      })
    )
  }
  updateCreditoV2(idCredito, CantidadCredito): Observable<any>{
    return this.http.put(`http://localhost:3000/api/credito/edit/${idCredito}`, { idCredito, CantidadCredito },
      {headers: new HttpHeaders( { Authorization: localStorage.getItem('token')} )}).pipe(
      map( (data: Credito) => {
        console.log(data);
        return data;
      })
    )
  }
}
