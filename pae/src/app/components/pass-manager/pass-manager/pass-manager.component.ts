import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pass-manager',
  templateUrl: './pass-manager.component.html',
  styleUrls: ['./pass-manager.component.css']
})
export class PassManagerComponent implements OnInit {
  theUser: User;

  inputEmail = '';
  Pregunta1 = '';
  Pregunta2 = '';
  inputRespuesta1 = '';
  inputRespuesta2 = '';
  inputNewPass1 = '';
  inputNewPass2 = '';

  isFromLogin: boolean;
  f1ValidationPassed = false;
  f2ValidationPassed = false;

  alertInvalidEmail = true;
  alertInvalidAnswers = true;
  alertInvalidPass = true;
  alertInvalidPassLength = true;
  alertInvalidForm1 = true;
  alertInvalidForm2 = true;
  alertInvalidForm3 = true;

  constructor(private userService: UserService, private _ROUTER: Router) {
    if (localStorage.getItem('redirectFromLogin') === 'true') {
      this.isFromLogin = true;
    } else {
      this.isFromLogin = false;
      this.inputEmail = localStorage.getItem('email');
      this.userService.getUserByEmail(this.inputEmail).subscribe(
        (data: User) => {
          if (data) {
            this.theUser = data;
            this.Pregunta1 = data.pregunta1;
            this.Pregunta2 = data.pregunta2;
            this.f1ValidationPassed = true;
          } else {
            console.log('User not found');
          }
        }
      );
      this.f1ValidationPassed = true;
    }
  }

  ngOnInit(): void {
  }

  submitEmail(form: NgForm) {
    if (form.valid) {
      this.userService.getUserByEmail(this.inputEmail).subscribe(
        (data: User) => {
          if (data) {
            if (data.email === this.inputEmail) {
              this.Pregunta1 = data.pregunta1;
              this.Pregunta2 = data.pregunta2;
              this.theUser = data;
              this.f1ValidationPassed = true;
            }
          } else {
            this.alertInvalidEmail = false;
          }
        },
        err => console.log(err)
      );
    } else {
      this.alertInvalidForm1 = false;
    }
  }

  submitAnswers(form: NgForm) {
    if (form.valid) {
      if (form.value.inputRespuesta1 === this.theUser.respuesta1 && form.value.inputRespuesta2 === this.theUser.respuesta2) {
        this.f2ValidationPassed = true;
      } else {
        this.alertInvalidAnswers = false;
      }
    } else {
      this.alertInvalidForm2 = false;
    }
  }

  submitNewPass(form: NgForm) {
    if (form.valid) {
      if (form.value.inputNewPass1 === form.value.inputNewPass2) {
        if (form.value.inputNewPass1.length >= 6) {
          this.userService.updatePassword(this.theUser.email, form.value.inputNewPass1).subscribe(
            (data: any) => {
              console.log(data);
            }
          );
        } else {
          this.alertInvalidPassLength = false;
        }
      } else {
        this.alertInvalidPass = false;
      }
    } else {
      this.alertInvalidForm3 = false;
    }
  }


  returnToProfile() {
    this._ROUTER.navigate(['/login']);
  }

  closeInvalidEmail() {
    this.alertInvalidEmail = true;
  }
  closeInvalidAnswers() {
    this.alertInvalidAnswers = true;
  }
  closeInvalidPass() {
    this.alertInvalidPass = true;
  }
  closeInvalidPassLength() {
    this.alertInvalidPassLength = true;
  }
  closeInvalidForm1() {
    this.alertInvalidForm1 = true;
  }
  closeInvalidForm2() {
    this.alertInvalidForm2 = true;
  }
  closeInvalidForm3() {
    this.alertInvalidForm3 = true;
  }

}
