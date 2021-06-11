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
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {CdkGeneroTarefaGridComponent} from './cdk-genero-tarefa-grid.component';
import {CdkGeneroTarefaAutocompleteModule} from '@cdk/components/genero-tarefa/cdk-genero-tarefa-autocomplete/cdk-genero-tarefa-autocomplete.module';
import {CdkGeneroTarefaFilterModule} from '../sidebars/cdk-genero-tarefa-filter/cdk-genero-tarefa-filter.module';

@NgModule({
    declarations: [
        CdkGeneroTarefaGridComponent,
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
        CdkGeneroTarefaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
