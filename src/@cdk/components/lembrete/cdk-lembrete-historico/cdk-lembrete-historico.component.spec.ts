import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdkLembreteHistoricoComponent} from './cdk-lembrete-historico.component';

describe('CdkLembreteHistoricoComponent', () => {
  let component: CdkLembreteHistoricoComponent;
  let fixture: ComponentFixture<CdkLembreteHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkLembreteHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkLembreteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
