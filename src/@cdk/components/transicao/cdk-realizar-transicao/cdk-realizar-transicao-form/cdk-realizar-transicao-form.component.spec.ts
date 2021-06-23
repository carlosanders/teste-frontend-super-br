import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdkRealizarTransicaoFormComponent} from './cdk-realizar-transicao-form.component';

describe('CdkRealizarTransicaoFormComponent', () => {
  let component: CdkRealizarTransicaoFormComponent;
  let fixture: ComponentFixture<CdkRealizarTransicaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkRealizarTransicaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkRealizarTransicaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
