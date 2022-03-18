import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = environment.url + "/Message";

  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  sendMessage(message: Message) : Observable<Message> {
    /*
    *   Sende die Nachricht zum Backend
    *   (Endpunkt '/SendMessage')
    * */
    throw new Error('Method not implemented.');
  }

  receiveMessages(id: string) : Observable<HttpResponse<Message[]>>  /* soll eine Message Liste zurückgeben */ {
    /*
    *   Empfange mithilfe deiner ID Nachrichten vom Backend
    *   (Endpunkt '/ReceiveMessages/<deine ID>')
    * */
    throw new Error('Method not implemented.');
  }
}
