import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkEspecieSetorFormComponent} from './cdk-especie-setor-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroSetorAutocompleteModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkGeneroSetorGridsearchModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-gridsearch/cdk-genero-setor-gridsearch.module';


@NgModule({
    declarations: [CdkEspecieSetorFormComponent],
    exports: [
        CdkEspecieSetorFormComponent
    ],
    imports: [
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        CdkGeneroSetorAutocompleteModule,
        CdkEspecieSetorGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        CdkGeneroSetorGridsearchModule
    ]
})
export class CdkEspecieSetorFormModule { }
