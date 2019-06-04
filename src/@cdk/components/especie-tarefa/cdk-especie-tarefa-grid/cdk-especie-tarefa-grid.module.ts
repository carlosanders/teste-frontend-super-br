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
import { CdkEspecieTarefaGridFilterComponent } from './cdk-especie-tarefa-grid-filter/cdk-especie-tarefa-grid-filter.component';
import { CdkEspecieTarefaAutocompleteModule } from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridComponent,
        CdkEspecieTarefaGridFilterComponent
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
