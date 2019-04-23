import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ReposData} from '../config';
import {Router} from '@angular/router';
import {ClrDatagridStringFilterInterface,ClrDatagridComparatorInterface} from "@clr/angular";


class NameFilter implements ClrDatagridStringFilterInterface<ReposData> {
    accepts(repo: ReposData, search: string):boolean {
        return repo.name.toLowerCase().indexOf(search) >= 0;
    }
}


class NumberSorter implements ClrDatagridComparatorInterface<ReposData> {
  compare(a: ReposData, b: ReposData) {
      return a.commits - b.commits;
  }
}


@Component({
  selector: 'app-git-viewer',
  templateUrl: './git-viewer.component.html',
  styleUrls: ['./git-viewer.component.css']
})
export class GitViewerComponent implements OnInit {
  nameFilter = new NameFilter();
  numberSorter = new NumberSorter();
  reposData:[ReposData] ; 

  constructor(private authService:AuthService, private router:Router) {
   
   }

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard(){
    this.authService.getDashboard().subscribe((res:{success:boolean,error:string,data:[ReposData]})=>{
      if(!res.success){
        alert(res.error);
      }else{
        this.reposData = res.data ; 
      }
    })
  }
  openDetailedPage(repoName){
    this.router.navigate(['/detailed',repoName]);
  }

}
