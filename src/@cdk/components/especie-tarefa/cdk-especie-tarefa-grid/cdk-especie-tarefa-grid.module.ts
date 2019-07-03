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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieTarefaService } from '@cdk/services/especie-tarefa.service';
import { CdkEspecieTarefaGridComponent} from './cdk-especie-tarefa-grid.component';
import { CdkEspecieTarefaAutocompleteModule } from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaGridFilterModule} from './cdk-especie-tarefa-grid-filter/cdk-especie-tarefa-grid-filter.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkEspecieTarefaGridComponent
    ]
})
export class CdkEspecieTarefaGridModule {
}
