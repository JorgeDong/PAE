import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/socket-io.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit, OnDestroy {

  msg = '';
  listaMensajes: string[] = [];
  mensajesSubscription: Subscription;
  user: User;

  constructor(private socketIOService: SocketIoService, private userService: UserService) {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        console.log(err);
      }
    )
   }

  ngOnInit(): void {
    this.mensajesSubscription = this.socketIOService.getMessage()
                                    .subscribe((msg: string) => {
                                      this.listaMensajes.push(msg);
                                      console.log("Mensaje enviado");
                                    })
    }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  enviarMensaje() {
    if (this.msg !== ''){
      if (this.user === undefined) {
        this.socketIOService.sendMessage('Invitado: ' + this.msg);
      } else {
        this.socketIOService.sendMessage(this.user.name + ': ' + this.msg);
      }
    }
    this.msg = '';
  }

  pujar(cantidad) {
    if (this.user === undefined) {
      alert("Inicia sesión para poder participar en la subasta");
    } else {
      this.socketIOService.sendMessage(this.user.name + ' pujó +' + cantidad);
    }
  }
}
