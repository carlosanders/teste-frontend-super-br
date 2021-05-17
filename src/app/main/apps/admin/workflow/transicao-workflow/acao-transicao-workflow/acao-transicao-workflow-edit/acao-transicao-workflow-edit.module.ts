import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {AcaoTransicaoWorkflowEditComponent} from './acao-transicao-workflow-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {AcaoTransicaoWorkflowEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {modulesConfig} from 'modules/modules-config';
import {TipoAcaoWorkflowService} from "@cdk/services/tipo-acao-workflow.service";

const routes: Routes = [
    {
        path: ':acaoTransicaoWorkflowHandle',
        component: AcaoTransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: '1',
                loadChildren: () => import('./tipo-acao-workflow-trigger/tipo-acao-workflow-trigger-001/tipo-acao-workflow-trigger-001.module')
                    .then(m => m.TipoAcaoWorkflowTrigger001Module),
            },
            {
                path: '2',
                loadChildren: () => import('./tipo-acao-workflow-trigger/tipo-acao-workflow-trigger-002/tipo-acao-workflow-trigger-002.module')
                    .then(m => m.TipoAcaoWorkflowTrigger002Module),
            },
            {
                path: '3',
                loadChildren: () => import('./tipo-acao-workflow-trigger/tipo-acao-workflow-trigger-003/tipo-acao-workflow-trigger-003.module')
                    .then(m => m.TipoAcaoWorkflowTrigger003Module),
            },
            {
                path: '4',
                loadChildren: () => import('./tipo-acao-workflow-trigger/tipo-acao-workflow-trigger-004/tipo-acao-workflow-trigger-004.module')
                    .then(m => m.TipoAcaoWorkflowTrigger004Module),
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/transicao-workflow/acao-transicao-workflow/acao-transicao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoTransicaoWorkflowEditComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,

        AcaoTransicaoWorkflowEditStoreModule,
    ],
    providers: [
        AcaoTransicaoWorkflowService,
        TipoAcaoWorkflowService,
        fromGuards.ResolveGuard
    ]
})
export class AcaoTransicaoWorkflowEditModule {
}
