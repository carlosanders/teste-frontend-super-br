import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivistaClassificacaoEditComponent } from './arquivista-classificacao-edit.component';

describe('ArquivistaClassificacaoEditComponent', () => {
  let component: ArquivistaClassificacaoEditComponent;
  let fixture: ComponentFixture<ArquivistaClassificacaoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaClassificacaoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaClassificacaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
