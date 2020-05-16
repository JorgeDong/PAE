import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credito } from 'src/app/models/Credito';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  filteredData : Credito[];

  constructor(private http: HttpClient) { }

  getAllCreditos(): Observable<any>{
    //return this.http.get('http://localhost:3000/api/credito').pipe(
    return this.http.get(environment.apiUrl + 'credito').pipe(
      map((data: Credito[]) => {
        console.log(data);
        return data;
      })
    )
  }
  getCreditoByID(ID): Observable<any>{
    //return this.http.get('http://localhost:3000/api/credito').pipe(
    return this.http.get(environment.apiUrl + 'credito').pipe(
      map((data: Credito[]) => {
        const filteredData = data.filter( dataCredito => dataCredito.idUsuario_fk === ID);
        return filteredData[0];
      })
    );
  }
  updateCredito(ID, idCredito, idUsuario_fk, CantidadCredito, moneda):Observable<any>{
    return this.http.put(environment.apiUrl +`credito/update/${ID}`, {idCredito:idCredito, idUsuario_fk:idUsuario_fk, 
    //return this.http.put(`http://localhost:3000/api/credito/update/${ID}`, {idCredito:idCredito, idUsuario_fk:idUsuario_fk, 
    CantidadCredito:CantidadCredito, moneda:moneda}).pipe(
      map( (data:any) => {
        console.log(data);
        return data;
      })
    )
  }
  updateCreditoV2(idCredito, CantidadCredito): Observable<any>{
    return this.http.put(environment.apiUrl +`credito/edit/${idCredito}`, { idCredito, CantidadCredito },
    //return this.http.put(`http://localhost:3000/api/credito/edit/${idCredito}`, { idCredito, CantidadCredito },
      {headers: new HttpHeaders( { Authorization: localStorage.getItem('token')} )}).pipe(
      map( (data: Credito) => {
        console.log(data);
        return data;
      })
    )
  }
}
