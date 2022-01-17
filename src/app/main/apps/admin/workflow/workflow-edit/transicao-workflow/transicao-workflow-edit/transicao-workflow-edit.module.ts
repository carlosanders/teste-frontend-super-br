import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransicaoWorkflowEditComponent} from './transicao-workflow-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatRippleModule,} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import * as fromGuards from './store/guards';
import {TransicaoWorkflowEditStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';

const routes: Routes = [
    {
        path: ':transicaoWorkflowHandle',
        component: TransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/transicao-workflow-dados-basicos.module')
                    .then(m => m.TransicaoWorkflowDadosBasicosModule)
            },
            {
                path: 'validacoes',
                loadChildren: () => import('./validacao-transicao-workflow/validacao-transicao-workflow.module')
                    .then(m => m.ValidacaoTransicaoWorkflowModule),
            },
            {
                path: 'acoes',
                loadChildren: () => import('./acao-transicao-workflow/acao-transicao-workflow.module')
                    .then(m => m.AcaoTransicaoWorkflowModule)
            },
            {
                path: 'sub-workflows',
                loadChildren: () => import('./sub-workflow/sub-workflow.module').then(m => m.SubWorkflowModule),
            },
            {
                path: '**',
                redirectTo: 'dados-basicos'
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TransicaoWorkflowEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatRippleModule,
        MatIconModule,
        MatButtonModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        TransicaoWorkflowEditStoreModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        TransicaoWorkflowService
    ]
})
export class TransicaoWorkflowEditModule {
}
