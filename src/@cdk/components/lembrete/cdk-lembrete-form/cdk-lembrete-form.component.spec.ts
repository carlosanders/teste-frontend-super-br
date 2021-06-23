import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CdkLembreteFormComponent} from './cdk-lembrete-form.component';

describe('CdkLembreteFormComponent', () => {
  let component: CdkLembreteFormComponent;
  let fixture: ComponentFixture<CdkLembreteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkLembreteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkLembreteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
