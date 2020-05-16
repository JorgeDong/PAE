import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private authService: AuthService,
              private _ROUTER: Router,
              private route: ActivatedRoute) {
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
    this.route.queryParams.subscribe((params)=>{
      if(params.code){
        this.authService.loginGoogle(params).subscribe(
          (data)=>{
            if(this.authService.isLoggedIn()){
              this._ROUTER.navigate(['/profile']);
            }
        })
      }
    })
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
        this._ROUTER.navigate(['/profile']);
      },
      (err) => {
        this.NotUserFoundAlert = false;
        console.log(err)
      }
    )
    form.reset();
  }

  redirectChangePass() {
    localStorage.setItem('redirectFromLogin', 'true');
    this._ROUTER.navigate(['profile/change-pass']);
  }

  close() {
    this.NotUserFoundAlert = true;
  }

}
