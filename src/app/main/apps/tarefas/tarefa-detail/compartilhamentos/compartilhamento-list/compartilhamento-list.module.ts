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
import {CompartilhamentoListComponent} from './compartilhamento-list.component';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {RouterModule, Routes} from '@angular/router';
import {CompartilhamentoListStoreModule} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store/store.module';
import {CdkCompartilhamentoGridModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-grid/cdk-compartilhamento-grid.module';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompartilhamentoListComponent
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

        CdkCompartilhamentoGridModule,

        CompartilhamentoListStoreModule,
    ],
    providers: [
        CompartilhamentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CompartilhamentoListComponent
    ]
})
export class CompartilhamentoListModule {
}
