export var _HOST:string = 'http://localhost:3000';

export class ReposData{
    name:string; 
    commits:number;
    releases:number;
    contributors:number;
    branches:number;
    license:string;
    readme:string; 
    dCommits:Array<Object>;
  };