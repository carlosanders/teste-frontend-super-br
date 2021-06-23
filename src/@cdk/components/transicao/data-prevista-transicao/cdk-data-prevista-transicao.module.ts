import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDataPrevistaTransicaoComponent} from './cdk-data-prevista-transicao.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@cdk/angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSharedModule} from '../../../shared.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';


@NgModule({
    declarations: [CdkDataPrevistaTransicaoComponent],
    exports: [
        CdkDataPrevistaTransicaoComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        NgxUpperCaseDirectiveModule,

        CdkSharedModule,
        MatDatetimepickerModule,
    ]
})
export class CdkDataPrevistaTransicaoModule { }
