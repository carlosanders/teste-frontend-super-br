import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaUsuarioFilterComponent} from './cdk-vinculacao-pessoa-usuario-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {VinculacaoPessoaUsuarioService} from '../../../../services/vinculacao-pessoa-usuario.service';
import {CdkPaisAutocompleteModule} from '../../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '../../../modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '../../../modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';

@NgModule({
    declarations: [
        CdkVinculacaoPessoaUsuarioFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkPaisAutocompleteModule,
        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        CdkModalidadeQualificacaoPessoaAutocompleteModule,
    ],
    providers: [
        VinculacaoPessoaUsuarioService,
    ],
    exports: [
        CdkVinculacaoPessoaUsuarioFilterComponent
    ]
})
export class CdkVinculacaoPessoaUsuarioFilterModule {
}
