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

  inputEmail = '';
  inputRespuesta1 = '';
  inputRespuesta2 = '';
  inputNewPass1 = '';
  inputNewPass2 = '';

  isFromLogin: boolean;
  validationPassed = false;

  alertInvalidForm1 = true;
  alertInvalidForm2 = true;

  constructor(private userService: UserService, private _ROUTER: Router) {
    if (localStorage.getItem('redirectFromLogin') === 'true') {
      this.isFromLogin = true;
    } else {
      this.isFromLogin = false;
      this.inputEmail = localStorage.getItem('email');
    }
  }

  ngOnInit(): void {
  }

  submitEmail(form: NgForm) {
    if (form.valid) {
      this.userService.getUserByEmail(this.inputEmail).subscribe(
        (data: User) => {
          console.log(data);
          if (data.respuesta1 === form.value.inputRespuesta1 && data.respuesta2 === form.value.inputRespuesta2 ) {
            this.validationPassed = true;
          }
        }
      );
    } else {
      this.alertInvalidForm1 = false;
    }
  }

  submitAnswers(form: NgForm) {
    
  }

  submitNewPass(form: NgForm) {
    if (form.valid) {
      if (form.value.inputNewPass1 === form.value.inputNewPass2) {
        console.log(form.value);
      }
    } else {
      this.alertInvalidForm2 = false;
    }
  }


  returnToProfile() {
    this._ROUTER.navigate(['/login']);
  }

  closeInvalidForm1() {
    this.alertInvalidForm1 = true;
  }
  closeInvalidForm2() {
    this.alertInvalidForm2 = true;
  }

}
