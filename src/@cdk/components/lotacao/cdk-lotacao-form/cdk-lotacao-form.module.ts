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
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkLotacaoFormComponent} from './cdk-lotacao-form.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkColaboradorAutocompleteModule} from '../../colaborador/cdk-colaborador-autocomplete/cdk-colaborador-autocomplete.module';
import {CdkColaboradorGridsearchModule} from '../../colaborador/cdk-colaborador-autocomplete/cdk-colaborador-gridsearch/cdk-colaborador-gridsearch.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';

@NgModule({
    declarations: [
        CdkLotacaoFormComponent,
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
        MatTooltipModule,

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        CdkSetorGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkColaboradorAutocompleteModule,
        CdkColaboradorGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkLotacaoFormComponent
    ]
})
export class CdkLotacaoFormModule {
}
