import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProtocoloExternoFormComponent} from './cdk-protocolo-externo-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkGeneroSetorAutocompleteModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroSetorGridsearchModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-gridsearch/cdk-genero-setor-gridsearch.module';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {MatSelectModule} from '@angular/material/select';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {FavoritoService} from '../../../services/favorito.service';
import {CdkEstadoAutocompleteModule} from '../../estado/cdk-estado-autocomplete/cdk-estado-autocomplete.module';
import {CdkEstadoGridsearchModule} from '../../estado/cdk-estado-autocomplete/cdk-estado-gridsearch/cdk-estado-gridsearch.module';

@NgModule({
    declarations: [
        CdkProtocoloExternoFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatTooltipModule,
        MatRadioModule,
        NgxUpperCaseDirectiveModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkPessoaAutocompleteModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        MatCardModule,
        MatSlideToggleModule,
        CdkGeneroSetorAutocompleteModule,
        CdkGeneroSetorGridsearchModule,
        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridsearchModule,
        MatSelectModule,
        CdkPessoaGridsearchModule,

        CdkEstadoAutocompleteModule,
        CdkEstadoGridsearchModule
    ],
    providers: [
        FavoritoService
    ],
    exports: [
        CdkProtocoloExternoFormComponent
    ]
})
export class CdkProtocoloExternoFormModule {
}
