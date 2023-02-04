import {Injectable} from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class AnnotationForUserWebsocketService {
  stompClient = null;
  annotationsWebSocket: any[] = [];

  public connect(userId: number) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, function (frame) {
      _this.sendMessage(userId);
      _this.stompClient.subscribe('/ws/annotations', function(hello){
        if (JSON.parse(hello.body)) {
          _this.showMessage(JSON.parse(hello.body));
        }
      });
    });
  }

  public sendMessage(userId: number) {
    this.stompClient.send(
      '/current/annotations',
      {},
      JSON.stringify(userId)
    );
  }

  public showMessage(data: any) {
    this.annotationsWebSocket.push(data);
  }

  public disconnect() {
    this.stompClient.disconnect();
  }

}
