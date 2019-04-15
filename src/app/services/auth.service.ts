import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { _HOST } from '../config';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:boolean =false; 
  constructor(private http:HttpClient,private router:Router) {}

  getToken(){
    // var token:String = window.localStorage.getItem('JWT_token');
    // console.log(token)
    console.log(document.cookie);
  }
  isLoggedIn():Promise<boolean> {
    return this.http.post(_HOST + '/auth',{},{withCredentials: true}).toPromise().then((_)=>{
      this.loginStatus = true;
      return true; 
    }).catch((_)=>{
      return false;
    })
  }

  logout(){
    this.http.post(_HOST + '/logout',{},{withCredentials: true}).subscribe((res)=>{
      console.log(res)
        this.loginStatus = false; 
        this.router.navigate(['/login']);
    
    });
  }
}


