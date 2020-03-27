import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDataPrevistaTransicaoComponent } from './criar-data-prevista-transicao.component';

describe('CriarDataPrevistaTransicaoComponent', () => {
  let component: CriarDataPrevistaTransicaoComponent;
  let fixture: ComponentFixture<CriarDataPrevistaTransicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarDataPrevistaTransicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarDataPrevistaTransicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
