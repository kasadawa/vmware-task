import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitViewerComponent } from './git-viewer.component';

describe('GitViewerComponent', () => {
  let component: GitViewerComponent;
  let fixture: ComponentFixture<GitViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
