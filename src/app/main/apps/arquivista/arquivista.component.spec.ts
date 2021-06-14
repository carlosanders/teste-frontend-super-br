import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArquivistaComponent} from './arquivista.component';

describe('ArquivistaComponent', () => {
  let component: ArquivistaComponent;
  let fixture: ComponentFixture<ArquivistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
