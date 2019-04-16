export var _HOST:string = 'http://localhost:3000';

export class ReposData{
    name:string; 
    commits:number;
    releases:number;
    contributors:number;
    branches:number;
    license:string;
  };


export class DetailedData{
    readme:string; 
    commits:Array<Object>;
}