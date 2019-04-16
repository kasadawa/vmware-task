import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { _HOST } from '../config';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatusUpdated:EventEmitter<boolean> = new EventEmitter();
  loginStatus:boolean =false; 
  
  constructor(private http:HttpClient,private router:Router) {}

  isLoggedIn():Promise<boolean> {
    return this.http.post(_HOST + '/auth',{},{withCredentials: true}).toPromise().then((_)=>{
      this.loginStatus = true;
      this.loginStatusUpdated.emit(this.loginStatus);
      return true; 
    }).catch((_)=>{
      return false;
    })
  }

  logout(){
    this.http.post(_HOST + '/logout',{},{withCredentials: true}).subscribe(()=>{
        this.loginStatus = false; 
        this.router.navigate(['/login']);
    
    });
  }

  getDashboard(){
    return this.http.get(_HOST + '/auth/dashboard',{withCredentials:true});
  }

  getDetailed(repoName){
    return this.http.get(_HOST + '/auth/detailed/'+ repoName.toString() ,{withCredentials:true});
  }
}


