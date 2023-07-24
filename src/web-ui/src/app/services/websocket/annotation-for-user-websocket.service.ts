import {Injectable} from '@angular/core';
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnnotationForUserWebsocketService {
  stompClient = null;
  annotationsWebSocket = new BehaviorSubject([]);

  public connect(userId: number) {
    const socket = new SockJS(environment.appBaseUrl + '/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, function () {
      _this.sendMessage(userId);
      _this.stompClient.subscribe('/ws/annotations', function (data) {
        if (JSON.parse(data.body)) {
          _this.pushAnnotations(JSON.parse(data.body));
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

  public pushAnnotations(data: any) {
    this.annotationsWebSocket.next(data);
  }

  public disconnect() {
    this.stompClient.disconnect();
  }

}
