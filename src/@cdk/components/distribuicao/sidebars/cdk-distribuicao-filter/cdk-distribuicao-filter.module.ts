import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoFilterComponent} from './cdk-distribuicao-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {Tarefa} from '@cdk/models';
import {Documento} from '@cdk/models';
import {CdkTarefaAutocompleteModule} from '../../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkDistribuicaoFilterComponent,
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
        CdkTarefaAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkSetorAutocompleteModule,
    ],
    providers: [
        DistribuicaoService,
    ],
    exports: [
        CdkDistribuicaoFilterComponent
    ]
})
export class CdkDistribuicaoFilterModule {
}
