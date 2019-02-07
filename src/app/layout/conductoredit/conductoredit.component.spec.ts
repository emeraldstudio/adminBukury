import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductoreditComponent } from './conductoredit.component';

describe('ConductoreditComponent', () => {
  let component: ConductoreditComponent;
  let fixture: ComponentFixture<ConductoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
