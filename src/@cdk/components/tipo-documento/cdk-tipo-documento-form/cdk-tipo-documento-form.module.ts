import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTipoDocumentoFormComponent} from './cdk-tipo-documento-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroDocumentoAutocompleteModule} from '../../genero-documento/cdk-genero-documento-autocomplete/cdk-genero-documento-autocomplete.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkTipoDocumentoGridsearchModule} from '../cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';
import {CdkEspecieDocumentoGridsearchModule} from '../../especie-documento/cdk-especie-documento-autocomplete/cdk-especie-documento-gridsearch/cdk-especie-documento-gridsearch.module';
import {CdkEspecieDocumentoAutocompleteModule} from '../../especie-documento/cdk-especie-documento-autocomplete/cdk-especie-documento-autocomplete.module';


@NgModule({
    declarations: [CdkTipoDocumentoFormComponent],
    exports: [
        CdkTipoDocumentoFormComponent
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
        CdkGeneroDocumentoAutocompleteModule,
        MatIconModule,
        MatTooltipModule,
        CdkTipoDocumentoGridsearchModule,
        CdkEspecieDocumentoGridsearchModule,
        CdkEspecieDocumentoAutocompleteModule
    ]
})
export class CdkTipoDocumentoFormModule { }
