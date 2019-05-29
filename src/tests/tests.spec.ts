import { TheOrangeAllianceComponent } from '../app/app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TheOrangeAllianceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
});
