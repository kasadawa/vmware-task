import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { _HOST } from '../config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body:Object){
    return this.http.post(_HOST + '/login',body,{withCredentials: true});
  }

}
