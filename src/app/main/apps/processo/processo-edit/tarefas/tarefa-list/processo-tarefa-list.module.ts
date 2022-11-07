import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {TarefaListComponent} from './tarefa-list.component';
import {TarefaService} from '@cdk/services/tarefa.service';
import {RouterModule, Routes} from '@angular/router';
import {TarefaListStoreModule} from 'app/main/apps/processo/processo-edit/tarefas/tarefa-list/store/store.module';
import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/tarefas/tarefa-list/store/guards';
import {CdkTarefaGridModule} from '@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {
    TableDefinitionsService
} from '../../../../../../../@cdk/components/table-definitions/table-definitions.service';

const routes: Routes = [
    {
        path: '',
        component: TarefaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/tarefas/tarefa-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        TarefaService,
        EspecieTarefaService,
        TableDefinitionsService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TarefaListComponent
    ]
})
export class ProcessoTarefaListModule {
}
