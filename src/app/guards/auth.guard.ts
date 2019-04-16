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
    

    // ako sme authenitificari i state.url == 'login'
    if(state.url === "/login"){
      return !res; 
    }


    if(!res){
      this.router.navigate(['/login']);
      return res; 
    }

    if(state.url === "/"){
      this.router.navigate(['/dashboard'])
    }


    return res;
  });

  }
}
