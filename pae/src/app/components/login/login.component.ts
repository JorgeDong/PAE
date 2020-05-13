import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/User';
import { TokenInfo } from 'src/app/models/TokenInfo';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  singleUser: User;
  tokenInfo = '';
  loginEmail = '';
  loginPassword = '';

  closeResult = '';
  NotUserFoundAlert = true;

  constructor(private modalService: NgbModal, private userService: UserService, private authService:AuthService, private router: Router) { 
    
    this.userService.usersSubject.subscribe( data => {
      this.users = data;
    });
    this.userService.singleUserSubject.subscribe( data => {
      this.singleUser = data;
    })
    this.userService.tokenSubject.subscribe( data => {
      this.tokenInfo = data;
    })
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  submitLogin(form: NgForm){
    this.authService.loginUser(this.loginEmail, this.loginPassword).subscribe(
      (data) => {
        this.router.navigate(['/profile'])
      },
      (err) => {
        this.NotUserFoundAlert = false;
        console.log(err)
      }
    )
    form.reset();
  }

  close() {
    this.NotUserFoundAlert = true;
  }

}
