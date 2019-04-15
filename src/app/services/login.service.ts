import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { _HOST } from '../config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body:Object){
    const headers = new HttpHeaders(
      {
      'access-control-allow-origin' : 'localhost:4200',
      'Access-Control-Allow-Credentials' : 'true',
      'content-type': 'application/json',
      'accept': 'application/json'
    });
    return this.http.post(_HOST + '/login',body,{withCredentials: true,headers});
  }

}
