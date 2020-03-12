import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrevistaTransicaoComponent } from './data-prevista-transicao.component';

describe('DataPrevistaTransicaoComponent', () => {
  let component: DataPrevistaTransicaoComponent;
  let fixture: ComponentFixture<DataPrevistaTransicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPrevistaTransicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPrevistaTransicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
