import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  checkIfUsernameIsFree(name: string) : Observable<HttpResponse<boolean>> {
    const url = `${environment.url}/CheckUsernameAvailability/${name}`;
    return this.httpClient.get<boolean>(url, {observe: 'response'});
  }

  createUser(name: string) : Observable<User> {
    const url = `${environment.url}/Create/${name}`;
    return this.httpClient.post<User>(url, {observe: 'response'});
  }

  getUsers() : Observable<HttpResponse<User[]>> {
    const url = `${environment.url}/Users`;
    return this.httpClient.get<User[]>(url, {observe: 'response'});
  }
}
