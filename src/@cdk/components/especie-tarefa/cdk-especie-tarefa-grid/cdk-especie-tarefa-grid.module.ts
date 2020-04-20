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
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaGridComponent} from './cdk-especie-tarefa-grid.component';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkEspecieTarefaFilterModule} from '../sidebars/cdk-especie-tarefa-filter/cdk-especie-tarefa-filter.module';

@NgModule({
    declarations: [
        CdkEspecieTarefaGridComponent,
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
        MatTooltipModule,
        MatSelectModule,

        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieTarefaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        EspecieTarefaService
    ],
    exports: [
        CdkEspecieTarefaGridComponent
    ]
})
export class CdkEspecieTarefaGridModule {
}
