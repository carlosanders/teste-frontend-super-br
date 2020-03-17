import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkClassificacaoTreeComponent } from './cdk-classificacao-tree.component';

describe('CdkClassificacaoTreeComponent', () => {
  let component: CdkClassificacaoTreeComponent;
  let fixture: ComponentFixture<CdkClassificacaoTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkClassificacaoTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkClassificacaoTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
