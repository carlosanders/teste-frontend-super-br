import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoGridFilterComponent } from './cdk-processo-grid-filter.component';
import {CdkDocumentoAvulsoAutocompleteModule} from '../../../documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkLocalizadorAutocompleteModule} from '../../../localizador/cdk-localizador-autocomplete/cdk-localizador-autocomplete.module';
import {CdkPessoaAutocompleteModule} from '../../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkClassificacaoAutocompleteModule} from '../../../classificacao/cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkModalidadeFaseAutocompleteModule} from '../../../modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeMeioAutocompleteModule} from '../../../modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkEspecieProcessoAutocompleteModule} from '../../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';

@NgModule({
    declarations: [
        CdkProcessoGridFilterComponent,
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

        FuseSharedModule,

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
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoGridFilterComponent
    ]
})
export class CdkProcessoGridFilterModule {
}
