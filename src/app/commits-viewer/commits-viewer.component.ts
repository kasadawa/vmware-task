import { Component, OnInit ,Input} from '@angular/core';
import {DetailedData} from '../config';
@Component({
  selector: 'app-commits-viewer',
  templateUrl: './commits-viewer.component.html',
  styleUrls: ['./commits-viewer.component.css']
})
export class CommitsViewerComponent implements OnInit {

  @Input() detailedData: DetailedData ;

  constructor() { }

  ngOnInit() {}

}
