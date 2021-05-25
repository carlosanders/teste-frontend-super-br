import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTipoContatoFormComponent} from './cdk-tipo-contato-form.component';
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
import {CdkTipoContatoGridsearchModule} from '../cdk-tipo-contato-autocomplete/cdk-tipo-contato-gridsearch/cdk-tipo-contato-gridsearch.module';


@NgModule({
    declarations: [CdkTipoContatoFormComponent],
    exports: [
        CdkTipoContatoFormComponent
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
        CdkTipoContatoGridsearchModule,
    ]
})
export class CdkTipoContatoFormModule { }
