import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-auction',
  templateUrl: './live-auction.component.html',
  styleUrls: ['./live-auction.component.css']
})
export class LiveAuctionComponent implements OnInit, OnDestroy {

  msg = '';
  listaMensajes: string[] = [];
  mensajesSubscription: Subscription;

  constructor(private socketIOService: SocketIoService) { }

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
    this.socketIOService.sendMessage(this.msg);
    this.msg = '';
  }


}
