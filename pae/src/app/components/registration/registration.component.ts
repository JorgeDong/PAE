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
  inputName: string;
  inputEmail = '';
  inputPassword1 = '';
  inputPassword2 = '';
  inputDireccion = '';
  inputCity = '';
  inputCountry = '';
  inputPregunta1 = '';
  inputRespuesta1 = '';
  inputPregunta2 = '';
  inputRespuesta2 = '';

  inputCredito = 0;

  alertEmptyValues = true;
  alertPassMismatch = true;
  alertPassLength = true;
  alertEmailExists = true;
  alertInvalidCredit = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {}

  submitReg(form: NgForm) {
    if (form.valid) {
            if (this.inputPassword1 !== this.inputPassword2) {
              this.alertPassMismatch = false;
              return;
            }
            if (this.inputPassword1.length < 6 ||  this.inputPassword2.length < 6) {
              this.alertPassLength = false;
              return;
            }
            if (+this.inputCredito > 0) {
              this.alertInvalidCredit = false;
            }
            this.alertEmptyValues = true;
            this.userService.registration(this.inputName,
            this.inputEmail,
            this.inputPassword1,
            this.inputPassword2,
            this.inputDireccion,
            this.inputCity,
            this.inputCountry,
            this.inputPregunta1,
            this.inputRespuesta1,
            this.inputPregunta2,
            this.inputRespuesta2).subscribe(
        (data: User) => {
          console.log('Current data: ' + data);
          this.userService.createUserCredito(data.id, this.inputCredito).subscribe(
            (credito: Credito) => {
              console.log('Credit done: ' + credito);
              this.router.navigate(['/login']);
            }
          );
        },
        (err) => this.alertEmailExists = false
      );
    } else {
      this.alertEmptyValues = false;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  closeEmptyValues() {
    this.alertEmptyValues = true;
  }
  closePassMismatch() {
    this.alertPassMismatch = true;
  }
  closePassLength() {
    this.alertPassLength = true;
  }
  closeEmailExists() {
    this.alertEmailExists = true;
  }
  closeInvalidCredit() {
    this.alertInvalidCredit = true;
  }

}
