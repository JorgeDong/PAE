import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/User';
import { Credito } from 'src/app/models/Credito';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  inputName = '';
  inputEmail = '';
  inputPassword1 = '';
  inputPassword2 = '';
  inputDireccion = '';
  inputCity = '';
  inputCountry = '';
  inputCredito = 0;

  constructor(private userService:UserService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  submitReg(form: NgForm){
    this.userService.registration(this.inputName,
                                  this.inputEmail,
                                  this.inputPassword1,
                                  this.inputPassword2,
                                  this.inputDireccion,
                                  this.inputCity,
                                  this.inputCountry).subscribe(
      (data: User) => {
            console.log('Currentdata: ' + data);
            this.userService.createUserCredito(data.id, this.inputCredito).subscribe(
              (credito: Credito) => {
                console.log('Credit done: ' + credito);
                this.router.navigate(['/login']);
              }
            );
      },
      (err) => {
        console.log(err);
      }
    );
  }


  
}
