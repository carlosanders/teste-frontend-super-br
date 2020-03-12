import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPrevistaTransicaoComponent } from './data-prevista-transicao.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [DataPrevistaTransicaoComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatProgressSpinnerModule
    ]
})
export class DataPrevistaTransicaoModule { }
