import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArquivistaEditBlocoComponent} from './arquivista-edit-bloco.component';

describe('ArquivistaEditBlocoComponent', () => {
  let component: ArquivistaEditBlocoComponent;
  let fixture: ComponentFixture<ArquivistaEditBlocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaEditBlocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaEditBlocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
