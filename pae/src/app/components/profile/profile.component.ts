import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user/user.service';
import { SubastaService } from '../../services/subasta/subasta.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  subastasCreadas = 0;
  objetosVendidos = 0;
  algomas = 0;

  constructor(private userService: UserService, private subastaService: SubastaService) { 
    this.init()
  }

  ngOnInit(): void {
  }

  init(){
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;
        this.subastaService.countByUserId(this.user.id).subscribe(
          (data) => {
            this.subastasCreadas = data;
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
