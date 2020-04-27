import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket:Socket) { }


  mandarMensaje(msg) {
    this.socket.emit('chat', msg);
  }

  leerChat() {
    return Observable.create(observer => this.socket.on('chat', msg => observer.next(msg)));
  }
}
