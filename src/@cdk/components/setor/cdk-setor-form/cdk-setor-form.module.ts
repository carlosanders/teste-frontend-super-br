import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSetorFormComponent } from './cdk-setor-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorGridsearchModule} from '../cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkEspecieSetorGridModule} from '../../especie-setor/cdk-especie-setor-grid/cdk-especie-setor-grid.module';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkEspecieSetorGridsearchModule} from "../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module";



@NgModule({
    declarations: [
        CdkSetorFormComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        NgxUpperCaseDirectiveModule,
        CdkSharedModule,
        MatAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridModule,
        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,
        CdkEspecieSetorGridsearchModule,
    ],
    providers: [

    ],
    exports: [
        CdkSetorFormComponent
    ]
})
export class CdkSetorFormModule {
}

