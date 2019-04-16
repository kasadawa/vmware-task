import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'vmwareProject';
  isAuthenticated:boolean = false; 
  constructor(public authService:AuthService){}

  ngOnInit(){
    this.authService.loginStatusUpdated.subscribe(status=>this.isAuthenticated = status)
  }

  logout(event){
    event.preventDefault(); 
    this.authService.logout(); 
  }
}
