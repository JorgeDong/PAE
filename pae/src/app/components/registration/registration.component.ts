import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService:UserService, private router:Router) { }

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
      (data) => {
        this.router.navigate(['/profile'])
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
