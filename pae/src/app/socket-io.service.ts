import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket:Socket) { }


  sendMessage(msg) {
    this.socket.emit('chat', msg);
  }

  getMessage() {
    return new Observable((observer) => {
      this.socket.on('chat', (msg) => {
        observer.next(msg);
      });
    });
  }
}
