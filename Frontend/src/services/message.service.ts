import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  endpoint: string = "/Message";

  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  sendMessage(message: Message) : Observable<any> {
    const url = `${environment.url}${this.endpoint}/SendMessage`;
    return this.httpClient.post(url, JSON.stringify(message), this.httpOptions);
  }

  receiveMessages(id: string) : Observable<HttpResponse<Message[]>> {
    const url = `${environment.url}${this.endpoint}/ReceiveMessages/${id}`;
    return this.httpClient.get<Message[]>(url, {observe: 'response'});
  }
}
