import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkProcesssoArquivistaFormComponent} from './cdk-processso-arquivista-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@cdk/angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkClassificacaoAutocompleteModule} from '../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';
import {CdkClassificacaoGridsearchModule} from '../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';
import {CdkClassificacaoGridTreeModule} from '../../classificacao/cdk-classificacao-grid-tree/cdk-classificacao-grid-tree.module';

@NgModule({
    declarations: [CdkProcesssoArquivistaFormComponent],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        CdkSharedModule,
        ReactiveFormsModule,
        CommonModule,
        CdkLogentryGridsearchModule,
        NgxUpperCaseDirectiveModule,
        MatAutocompleteModule,
        CdkClassificacaoAutocompleteModule,
        MatDatetimepickerModule,
        CdkClassificacaoGridsearchModule,
        CdkClassificacaoGridTreeModule
    ],
    exports: [
        CdkProcesssoArquivistaFormComponent
    ]
})
export class CdkProcessoArquivistaFormModule { }
