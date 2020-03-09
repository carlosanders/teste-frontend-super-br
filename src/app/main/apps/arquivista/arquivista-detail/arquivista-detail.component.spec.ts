import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivistaDetailComponent } from './arquivista-detail.component';

describe('ArquivistaDetailComponent', () => {
  let component: ArquivistaDetailComponent;
  let fixture: ComponentFixture<ArquivistaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
