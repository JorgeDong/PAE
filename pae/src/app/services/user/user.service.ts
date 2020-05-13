import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  singleUser: User;
  token = '';

  usersSubject = new BehaviorSubject<User[]>([]);
  singleUserSubject = new BehaviorSubject<User>(this.singleUser);
  tokenSubject = new BehaviorSubject<string>(this.token);
  
  constructor(private	http: HttpClient, private router: Router) {
  }

  getUsers(){
    this.http.get('http://localhost:3000/api/users').subscribe(
      (data: User[]) => { this.users = data;
                          this.usersSubject.next(this.users) },
      err => console.log(err)
    );
  }

  registration(name, email, password, password2, direccion, city, country):Observable<any>{
    console.log(name, email, password, password2, direccion, city, country);
    return this.http.post('http://localhost:3000/api/users/registration', {name: name, email: email, password: password, 
      password2: password2, direccion: direccion, city: city, country: country}).pipe(
      map( (data:any) => {
        if(data)
          return data;
        else{
          return null;
        }
      })
    )
  }

  getUserByEmail(email):Observable<any>{
    return this.http.get(`http://localhost:3000/api/users/readByEmail/${email}`).pipe(
      map( (data:any) => {
        this.singleUser = data[0];
        this.singleUserSubject.next(this.singleUser);
        return this.singleUser;
        }
      )
    )
  }
  
}
