import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivistaLembreteBlocoComponent } from './arquivista-lembrete-bloco.component';

describe('ArquivistaLembreteBlocoComponent', () => {
  let component: ArquivistaLembreteBlocoComponent;
  let fixture: ComponentFixture<ArquivistaLembreteBlocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaLembreteBlocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaLembreteBlocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
