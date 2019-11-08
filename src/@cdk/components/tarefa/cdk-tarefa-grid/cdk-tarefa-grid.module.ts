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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {CdkEspecieTarefaAutocompleteModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {CdkTarefaGridComponent} from './cdk-tarefa-grid.component';
import {CdkTarefaGridFilterModule} from './cdk-tarefa-grid-filter/cdk-tarefa-grid-filter.module';
import {CdkTarefaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTarefaGridComponent,
        CdkTarefaMainSidebarComponent,
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
        CdkTarefaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
