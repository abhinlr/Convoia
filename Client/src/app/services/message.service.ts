import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private socket: Socket) { }

  setup(authToken: string): void {
    this.socket = io(environment.chatUrl, {
      path: '/chat/',
      reconnection: true,
      autoConnect: false,
      extraHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });

    this.socket.connect();
  }
}
