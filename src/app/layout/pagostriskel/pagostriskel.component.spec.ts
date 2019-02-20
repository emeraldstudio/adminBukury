import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagostriskelComponent } from './pagostriskel.component';

describe('PagostriskelComponent', () => {
  let component: PagostriskelComponent;
  let fixture: ComponentFixture<PagostriskelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagostriskelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagostriskelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});