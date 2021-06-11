import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealizarDesarquivamentoComponent} from './realizar-transicao.component';

describe('RealizarTransicaoComponent', () => {
  let component: RealizarDesarquivamentoComponent;
  let fixture: ComponentFixture<RealizarDesarquivamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarDesarquivamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarDesarquivamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
