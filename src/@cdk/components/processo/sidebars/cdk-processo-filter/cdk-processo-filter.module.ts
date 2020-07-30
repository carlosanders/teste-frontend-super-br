import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoFilterComponent} from './cdk-processo-filter.component';
import {CdkDocumentoAvulsoAutocompleteModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkLocalizadorAutocompleteModule} from '@cdk/components/localizador/cdk-localizador-autocomplete/cdk-localizador-autocomplete.module';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkClassificacaoAutocompleteModule} from '@cdk/components/classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkModalidadeFaseAutocompleteModule} from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeMeioAutocompleteModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkEspecieProcessoAutocompleteModule} from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '@cdk/components/origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '../../cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    declarations: [
        CdkProcessoFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,

        CdkClassificacaoAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkPessoaAutocompleteModule,
        CdkLocalizadorAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkModalidadeFaseAutocompleteModule,
        CdkModalidadeMeioAutocompleteModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        MatExpansionModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoFilterComponent
    ]
})
export class CdkProcessoFilterModule {
}
