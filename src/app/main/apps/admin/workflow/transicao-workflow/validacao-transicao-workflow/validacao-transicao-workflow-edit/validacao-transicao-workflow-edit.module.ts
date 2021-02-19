import { TipoValidacaoWorkflowService } from './../../../../../../../../@cdk/services/tipo-validacao-workflow.service';
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
import {ValidacaoTransicaoWorkflowEditComponent} from './validacao-transicao-workflow-edit.component';
import {RouterModule, Routes} from '@angular/router';
//import {CdkValidacaoTransicaoWorkflowFormModule} from '@cdk/components/validacao-transicao-workflow/cdk-validacao-transicao-workflow-form/cdk-validacao-transicao-workflow-form.module';
import {ValidacaoTransicaoWorkflowEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':validacaoTransicaoWorkflowHandle',
        component: ValidacaoTransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: '1',
                loadChildren: () => import('./tipo-validacao-workflow-form/tipo-validacao-workflow-form-atr-para/tipo-validacao-workflow-form-atr-para.module')
                    .then(m => m.TipoValidacaoWorkflowFormAtrParaModule),
            },
            {
                path: '2',
                loadChildren: () => import('./tipo-validacao-workflow-form/tipo-validacao-workflow-form-criado-por/tipo-validacao-workflow-form-criado-por.module')
                    .then(m => m.TipoValidacaoWorkflowFormCriadoPorModule),
            },
            {
                path: '3',
                loadChildren: () => import('./tipo-validacao-workflow-form/tipo-validacao-workflow-form-setor-org/tipo-validacao-workflow-form-setor-org.module')
                    .then(m => m.TipoValidacaoWorkflowFormSetorOrgModule),
            },
            {
                path: '4',
                loadChildren: () => import('./tipo-validacao-workflow-form/tipo-validacao-workflow-form-tipo-doc/tipo-validacao-workflow-form-tipo-doc.module')
                    .then(m => m.TipoValidacaoWorkflowFormTipoDocModule),
            },
            {
                path: '5',
                loadChildren: () => import('./tipo-validacao-workflow-form/tipo-validacao-workflow-form-unidade/tipo-validacao-workflow-form-unidade.module')
                    .then(m => m.TipoValidacaoWorkflowFormUnidadeModule),
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/transicao-workflow/validacao-transicao-workflow/validacao-transicao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ValidacaoTransicaoWorkflowEditComponent
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

       // CdkValidacaoTransicaoWorkflowFormModule,
        ValidacaoTransicaoWorkflowEditStoreModule,
    ],
    providers: [
        ValidacaoTransicaoWorkflowService,
        TipoValidacaoWorkflowService,
        fromGuards.ResolveGuard
    ]
})
export class ValidacaoTransicaoWorkflowEditModule {
}
