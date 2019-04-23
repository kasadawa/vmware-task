import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { DetailedViewerComponent } from './detailed-viewer.component';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {CommitsViewerComponent} from '../commits-viewer/commits-viewer.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('DetailedViewerComponent', () => {
  let component: DetailedViewerComponent;
  let fixture: ComponentFixture<DetailedViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ClarityModule,HttpClientModule,RouterTestingModule],
      declarations: [ DetailedViewerComponent,CommitsViewerComponent],
      providers:[AuthService],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
