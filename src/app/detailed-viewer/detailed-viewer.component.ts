import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ReposData} from '../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detailed-viewer',
  templateUrl: './detailed-viewer.component.html',
  styleUrls: ['./detailed-viewer.component.css']
})
export class DetailedViewerComponent implements OnInit {
  reposData:ReposData;
  tmpData ;
  repoName:string = '';
  readme:string; 
  constructor(private authService:AuthService,private router:Router) {
    this.repoName = localStorage.getItem('repoName') || ''; // we need to get it from the get req with param
   }

  ngOnInit() {

    // you do not have to call all of the repos 
    this.authService.getDetailed(this.repoName).subscribe((res:{success:boolean,error:string,data:ReposData})=>{
      if(res.success){
        this.reposData = res.data ; 
        console.log(this.reposData)
        this.readme = atob(this.reposData.readme) || '';
      }
    })

  }

  backToRepos(){
    this.router.navigate(['dashboard']);
  }
}
