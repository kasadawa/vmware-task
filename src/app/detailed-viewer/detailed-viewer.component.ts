import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {DetailedData} from '../config';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detailed-viewer',
  templateUrl: './detailed-viewer.component.html',
  styleUrls: ['./detailed-viewer.component.css']
})
export class DetailedViewerComponent implements OnInit {
  detailedData:DetailedData;
  repoName:string = '';
  readme:string; 

  constructor(private authService:AuthService,private router:Router,private route: ActivatedRoute) {
    this.repoName = this.route.snapshot.params['reponame'];
   }

  ngOnInit() {
    this.getDetailedData();
  }

  getDetailedData(){
    this.authService.getDetailed(this.repoName).subscribe((res:{success:boolean,error:string,data:DetailedData})=>{
      if(!res.success){
       alert(res.error);
      }else{
        this.detailedData = res.data ; 
        this.readme = atob(this.detailedData.readme) ;
      }
    })
  }

  backToRepos(){
    this.router.navigate(['dashboard']);
  }

}
