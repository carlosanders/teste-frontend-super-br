import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdkCriarLembreteChipsComponent} from './cdk-criar-lembrete-chips.component';

describe('CdkCriarLembreteChipsComponent', () => {
  let component: CdkCriarLembreteChipsComponent;
  let fixture: ComponentFixture<CdkCriarLembreteChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkCriarLembreteChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkCriarLembreteChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
