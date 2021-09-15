import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
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
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {PathModule} from '@cdk/components/path/path.module';
import {CdkTipoAcaoWorkflowTrigger001Module} from '@cdk/components/acao-transicao-workflow/cdk-tipo-acao-workflow-trigger/cdk-tipo-acao-workflow-trigger-001/cdk-tipo-acao-workflow-trigger-001.module';
import {CdkTipoAcaoWorkflowTrigger002Module} from '@cdk/components/acao-transicao-workflow/cdk-tipo-acao-workflow-trigger/cdk-tipo-acao-workflow-trigger-002/cdk-tipo-acao-workflow-trigger-002.module';
import {CdkTipoAcaoWorkflowTrigger003Module} from '@cdk/components/acao-transicao-workflow/cdk-tipo-acao-workflow-trigger/cdk-tipo-acao-workflow-trigger-003/cdk-tipo-acao-workflow-trigger-003.module';
import {CdkTipoAcaoWorkflowTrigger004Module} from '@cdk/components/acao-transicao-workflow/cdk-tipo-acao-workflow-trigger/cdk-tipo-acao-workflow-trigger-004/cdk-tipo-acao-workflow-trigger-004.module';

const routes: Routes = [
    {
        path: ':acaoTransicaoWorkflowHandle',
        component: AcaoTransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/acao-transicao-workflow/acao-transicao-workflow-edit';

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
        PathModule,
        CdkTipoAcaoWorkflowTrigger001Module,
        CdkTipoAcaoWorkflowTrigger002Module,
        CdkTipoAcaoWorkflowTrigger003Module,
        CdkTipoAcaoWorkflowTrigger004Module,
    ],
    providers: [
        AcaoTransicaoWorkflowService,
        TipoAcaoWorkflowService,
        fromGuards.ResolveGuard
    ]
})
export class AcaoTransicaoWorkflowEditModule {
}
