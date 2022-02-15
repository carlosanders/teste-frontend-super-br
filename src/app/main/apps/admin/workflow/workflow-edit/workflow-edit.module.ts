import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowEditComponent} from './workflow-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatRippleModule,} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import * as fromGuards from './store/guards';
import {WorkflowEditStoreModule} from './store/store.module';

import {WorkflowService} from '@cdk/services/workflow.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':workflowHandle',
        component: WorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/workflow-dados-basicos.module')
                    .then(m => m.WorkflowDadosBasicosModule)
            },
            {
                path: 'transicoes',
                loadChildren: () => import('./transicao-workflow/transicao-workflow.module')
                    .then(m => m.TransicaoWorkflowModule)
            },
            {
                path: 'vinculacao-especie-processo-workflow',
                loadChildren: () => import('./vinculacao-especie-processo-workflow/vinculacao-especie-processo-workflow.module')
                    .then(m => m.VinculacaoEspecieProcessoWorkflowModule)
            },
            {
                path: 'visualizar',
                loadChildren: () => import('./workflow-view/workflow-view.module')
                    .then(m => m.WorkflowViewModule),
            },
            {
                path: '**',
                redirectTo: 'dados-basicos'
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [WorkflowEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatRippleModule,
        MatIconModule,
        MatButtonModule,

        TranslateModule,
        WorkflowEditStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        WorkflowService,
    ]
})
export class WorkflowEditModule {
}
