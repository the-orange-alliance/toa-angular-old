import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamDataComponent } from './manage-team-data.component';

describe('ManageTeamDataComponent', () => {
  let component: ManageTeamDataComponent;
  let fixture: ComponentFixture<ManageTeamDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
