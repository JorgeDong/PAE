import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { TokenInfo } from '../../models/TokenInfo'
import { BehaviorSubject } from 'rxjs';

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
  
  constructor(private	http: HttpClient) {
  }

  getUsers(){
    this.http.get('http://localhost:3000/api/users').subscribe(
      (data: User[]) => { this.users = data;
                          this.usersSubject.next(this.users) },
      err => console.log(err)
    );
  }

  getUserById(){

  }

  getUserByEmail(email){
    this.http.get(`http://localhost:3000/api/users/readByEmail/${email}`).subscribe(
      (data: User) => { this.singleUser = data[0];
                        this.singleUserSubject.next(this.singleUser)  },
      err => console.log(err)
    )
  }

  editUserById(){

  }

  editUserByEmail(){

  }
  
  loginUser(email, password){
    this.http.post('http://localhost:3000/api/users/login', {email: email, password: password}).subscribe(
      (data: TokenInfo) => { this.token = data.token;
                             this.tokenSubject.next(this.token) },
      err => console.log(err)
    )
  }
}
