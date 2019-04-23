import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommitsViewerComponent } from './commits-viewer.component';
import { ClarityModule } from '@clr/angular';

describe('CommitsViewerComponent', () => {
  let component: CommitsViewerComponent;
  let fixture: ComponentFixture<CommitsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ClarityModule],
      declarations: [ CommitsViewerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
