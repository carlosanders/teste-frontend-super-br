import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieRelatorioGridFilterComponent} from './cdk-especie-relatorio-grid-filter.component';
import {CdkGeneroTarefaAutocompleteModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';

@NgModule({
    declarations: [
        CdkEspecieRelatorioGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatetimepickerModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkGeneroTarefaAutocompleteModule,
        CdkUsuarioAutocompleteModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieRelatorioGridFilterComponent
    ]
})
export class CdkEspecieRelatorioGridFilterModule {
}
