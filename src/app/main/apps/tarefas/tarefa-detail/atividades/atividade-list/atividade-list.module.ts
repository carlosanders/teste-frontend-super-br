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
import {AtividadeListComponent} from './atividade-list.component';
import {AtividadeService} from '@cdk/services/atividade.service';
import {RouterModule, Routes} from '@angular/router';
import {AtividadeListStoreModule} from 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list/store/store.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkAtividadeGridModule} from '@cdk/components/atividade/cdk-atividade-grid/cdk-atividade-grid.module';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AtividadeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/atividades/atividade-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AtividadeListComponent
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

        CdkAtividadeGridModule,

        AtividadeListStoreModule,
    ],
    providers: [
        AtividadeService,
        EspecieAtividadeService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AtividadeListComponent
    ]
})
export class AtividadeListModule {
}
