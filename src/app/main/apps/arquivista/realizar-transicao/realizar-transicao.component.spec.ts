import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RealizarTransicaoComponent} from './realizar-transicao.component';

describe('RealizarTransicaoComponent', () => {
  let component: RealizarTransicaoComponent;
  let fixture: ComponentFixture<RealizarTransicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarTransicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarTransicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
