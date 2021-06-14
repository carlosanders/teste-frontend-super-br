import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdkDataPrevistaTransicaoComponent} from './cdk-data-prevista-transicao.component';

describe('DataPrevistaTransicaoComponent', () => {
  let component: CdkDataPrevistaTransicaoComponent;
  let fixture: ComponentFixture<CdkDataPrevistaTransicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkDataPrevistaTransicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkDataPrevistaTransicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
