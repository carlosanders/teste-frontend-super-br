import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransicaoArquivistaBlocoComponent} from './transicao-arquivista-bloco.component';

describe('TransicaoArquivistaBlocoComponent', () => {
  let component: TransicaoArquivistaBlocoComponent;
  let fixture: ComponentFixture<TransicaoArquivistaBlocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransicaoArquivistaBlocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransicaoArquivistaBlocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
