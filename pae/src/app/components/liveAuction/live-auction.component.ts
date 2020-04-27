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
  listaMensajes = [];
  mensajesSubscription: Subscription;

  constructor(private socketIOService: SocketIoService) { }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mensajesSubscription = this.socketIOService.leerChat().subscribe((msg: string) => this.listaMensajes.push(msg));
  }

  enviarMensaje() {
    this.socketIOService.mandarMensaje(this.msg);
  }
}
