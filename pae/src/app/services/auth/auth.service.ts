import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = "";
  logeado = new BehaviorSubject<boolean>(false);

  constructor(private	http: HttpClient, private router: Router, private route: ActivatedRoute) { }


  private saveToken(token){
    localStorage.setItem('token', token);
    this.token = token;
  }

  public isLoggedIn():boolean {
    const tokenData = this.getTokenData();
    if(tokenData){
      this.logeado.next(true);
      return true;
    } else { 
      this.logeado.next(false);
      return false;
    }
  }

  public getTokenData():any{
    if(this.token){
      return this.token
    }
    else{
      return null;
    }
  }

  loginUser(email, password):Observable<any>{
    return this.http.post('http://localhost:3000/api/users/login', {email: email, password: password}).pipe(
      map( (data:any) => {
        if(data.token){
          this.saveToken(data.token);
          localStorage.setItem('email', data.email);
          this.isLoggedIn();
        }
        return data.token;
      })
    )
  }

  loginGoogle(params): Observable<any>{
    console.log('HERE');
    return this.http.get('http://localhost:3000/api/users/api/google/redirect', {params}).pipe(
      map( (data: any) => {
        console.log('LOGIN BY GOOGLE')
        if(data.token){
          this.saveToken(data.token);
          localStorage.setItem('email', data.email);
          this.isLoggedIn();
        }
        return data.token;
      })
    )
  }

  public logOut(){
    this.token = '';
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    this.logeado.next(false);
    this.router.navigateByUrl('/');
  }

}
