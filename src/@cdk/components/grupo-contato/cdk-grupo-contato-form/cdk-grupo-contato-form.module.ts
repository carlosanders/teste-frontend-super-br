import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkGrupoContatoFormComponent} from './cdk-grupo-contato-form.component';
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
import {CdkGrupoContatoGridsearchModule} from '../cdk-grupo-contato-autocomplete/cdk-grupo-contato-gridsearch/cdk-grupo-contato-gridsearch.module';


@NgModule({
    declarations: [CdkGrupoContatoFormComponent],
    exports: [
        CdkGrupoContatoFormComponent
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
        CdkGrupoContatoGridsearchModule,
    ]
})
export class CdkGrupoContatoFormModule { }
