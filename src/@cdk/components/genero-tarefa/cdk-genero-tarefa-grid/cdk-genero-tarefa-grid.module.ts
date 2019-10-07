import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {CdkGeneroTarefaGridComponent} from './cdk-genero-tarefa-grid.component';
import {CdkGeneroTarefaAutocompleteModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkGeneroTarefaGridFilterModule} from './cdk-genero-tarefa-grid-filter/cdk-genero-tarefa-grid-filter.module';

@NgModule({
    declarations: [
        CdkGeneroTarefaGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkGeneroTarefaAutocompleteModule,
        CdkGeneroTarefaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroTarefaService,
    ],
    exports: [
        CdkGeneroTarefaGridComponent
    ]
})
export class CdkGeneroTarefaGridModule {
}
