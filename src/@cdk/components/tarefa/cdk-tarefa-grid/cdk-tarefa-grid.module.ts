import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '../..';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkTarefaGridComponent} from './cdk-tarefa-grid.component';
import {CdkTarefaFilterModule} from '../sidebars/cdk-tarefa-filter/cdk-tarefa-filter.module';
import {TableDefinitionsService} from "../../table-definitions/table-definitions.service";
import {DndModule} from "ngx-drag-drop";

@NgModule({
    declarations: [
        CdkTarefaGridComponent,
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

        CdkEspecieTarefaAutocompleteModule,
        CdkTarefaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        DndModule,
    ],
    providers: [
        EspecieTarefaService,
        TableDefinitionsService
    ],
    exports: [
        CdkTarefaGridComponent
    ]
})
export class CdkTarefaGridModule {
}
