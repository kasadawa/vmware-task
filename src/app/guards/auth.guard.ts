import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import { CanActivate, Router ,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {  
  
  return this.authService.isLoggedIn().then((res:boolean)=>{
    
    if(res && state.url === "/login"){
      this.router.navigate(['/dashboard']);
      return false; 
    }

    if(!res && state.url === "/login" ){
      console.log('goint here')
      return true; 
    }
    if(!res && state.url !== '/login'){
      this.router.navigate(['/login']);
      return res; 
    }
    return res;
  });

  }
}
