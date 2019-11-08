import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoGridFilterComponent} from './cdk-documento-avulso-grid-filter.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components//processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkDocumentoAutocompleteModule} from '@cdk/components/documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkEspecieDocumentoAvulsoAutocompleteModule} from '../../../especie-documento-avulso/cdk-especie-documento-avulso-autocomplete/cdk-especie-documento-avulso-autocomplete.module';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkDocumentoAvulsoAutocompleteModule} from '../../cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '@cdk/components/tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkModeloAutocompleteModule} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkEspecieDocumentoAvulsoAutocompleteModule,
        CdkModeloAutocompleteModule,
        CdkPessoaAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkTarefaAutocompleteModule,
    ],
    providers: [
        DocumentoAvulsoService,
    ],
    exports: [
        CdkDocumentoAvulsoGridFilterComponent
    ]
})
export class CdkDocumentoAvulsoGridFilterModule {
}
