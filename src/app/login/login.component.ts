import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { isError } from 'util';
import { LoginService} from '../services/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String; 
  password:String;



  errorMessage:String; 
  errorClass:Object = { 
    error: false, 
    active: false
  };

  constructor(private loginService:LoginService, private router: Router) {}

  ngOnInit() {
  }

  showError(){
      this.errorMessage = 'Wrong email or password';
      this.errorClass = {error: true, active:true};
  }
  login(){
 
    // we can check the email & password before sending them to the backend 


    this.loginService.login({email: this.email,password: this.password}).subscribe((data:{success:boolean,err:string})=>{
      if(data.success){
          this.router.navigate(['/dashboard']);
      }else{
        this.showError(); 
      }
    })
  }

}
