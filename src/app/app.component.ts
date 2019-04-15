import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'vmwareProject';

  constructor(public authService:AuthService){
    console.log(authService.loginStatus)
  }

  logout(event){
    event.preventDefault(); 
    this.authService.logout(); 
  }
}
