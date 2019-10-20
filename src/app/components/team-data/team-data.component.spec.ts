import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDataComponent } from './team-data.component';

describe('TeamDataComponent', () => {
  let component: TeamDataComponent;
  let fixture: ComponentFixture<TeamDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
