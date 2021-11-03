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
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkDocumentoFilterComponent} from './cdk-documento-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkRepositorioAutocompleteModule} from '@cdk/components/repositorio/cdk-repositorio-autocomplete/cdk-repositorio-autocomplete.module';
import {CdkDocumentoAvulsoAutocompleteModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkJuntadaAutocompleteModule} from '@cdk/components/juntada/cdk-juntada-autocomplete/cdk-juntada-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkTarefaAutocompleteModule} from '@cdk/components/tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkModeloAutocompleteModule} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkDocumentoFilterComponent,
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
        CdkProcessoAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkPessoaAutocompleteModule,
        CdkTipoDocumentoAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkTarefaAutocompleteModule,
        CdkJuntadaAutocompleteModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkModeloAutocompleteModule,
        CdkRepositorioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkDocumentoFilterComponent
    ]
})
export class CdkDocumentoFilterModule {
}
