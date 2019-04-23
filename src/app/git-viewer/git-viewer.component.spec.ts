import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitViewerComponent } from './git-viewer.component';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
describe('GitViewerComponent', () => {
  let component: GitViewerComponent;
  let fixture: ComponentFixture<GitViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ClarityModule,HttpClientModule,RouterTestingModule],
      declarations: [ GitViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
