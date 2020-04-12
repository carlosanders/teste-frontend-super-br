import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivistaClassificacaoBlocoComponent } from './arquivista-classificacao-bloco.component';

describe('ArquivistaClassificacaoBlocoComponent', () => {
  let component: ArquivistaClassificacaoBlocoComponent;
  let fixture: ComponentFixture<ArquivistaClassificacaoBlocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivistaClassificacaoBlocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivistaClassificacaoBlocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
