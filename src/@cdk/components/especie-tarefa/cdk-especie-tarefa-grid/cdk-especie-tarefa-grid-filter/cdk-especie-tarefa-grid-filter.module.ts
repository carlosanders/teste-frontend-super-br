import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaGridFilterComponent} from './cdk-especie-tarefa-grid-filter.component';
import {CdkGeneroTarefaAutocompleteModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatetimepickerModule,
        MatCheckboxModule,

        FuseSharedModule,

        CdkGeneroTarefaAutocompleteModule,
        CdkUsuarioAutocompleteModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaGridFilterComponent
    ]
})
export class CdkEspecieTarefaGridFilterModule {
}
