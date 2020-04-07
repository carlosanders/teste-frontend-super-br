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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkTarefaGridComponent} from './cdk-tarefa-grid.component';
import {CdkTarefaFilterModule} from '../sidebars/cdk-tarefa-filter/cdk-tarefa-filter.module';

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
    ],
    providers: [
        EspecieTarefaService,
    ],
    exports: [
        CdkTarefaGridComponent
    ]
})
export class CdkTarefaGridModule {
}
