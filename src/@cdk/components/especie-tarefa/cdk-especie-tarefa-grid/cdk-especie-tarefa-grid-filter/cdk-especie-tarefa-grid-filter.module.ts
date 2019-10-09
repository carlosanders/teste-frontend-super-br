import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { CdkEspecieTarefaGridFilterComponent } from './cdk-especie-tarefa-grid-filter.component';
import {CdkGeneroTarefaAutocompleteModule} from '../../../genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        CdkGeneroTarefaAutocompleteModule,
        MatAutocompleteModule,
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
