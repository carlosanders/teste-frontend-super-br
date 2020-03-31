import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {TarefaListComponent} from './tarefa-list.component';
import {ProcessosService} from 'src/@cdk/services/processos.service';
import {RouterModule, Routes} from '@angular/router';
import {TarefaListStoreModule} from 'app/main/apps/processo/processo-edit/tarefas/tarefa-list/store/store.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/tarefas/tarefa-list/store/guards';
import {CdkTarefaGridModule} from '@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.module';

const routes: Routes = [
    {
        path: '',
        component: TarefaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TarefaListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        CdkTarefaGridModule,

        TarefaListStoreModule,
    ],
    providers: [
        ProcessosService,
        EspecieTarefaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TarefaListComponent
    ]
})
export class ProcessoTarefaListModule {
}
