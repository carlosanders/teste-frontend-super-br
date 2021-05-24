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
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {TipoAcaoWorkflowTrigger003Component} from './tipo-acao-workflow-trigger-003.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from '@angular/common';
import * as fromGuards from './store/guards';
import {AcaoTriggerStoreModule} from '../store/store.module';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {CdkTipoAcaoWorkflowTrigger003Module} from '@cdk/components/acao-transicao-workflow/cdk-tipo-acao-workflow-trigger/cdk-tipo-acao-workflow-trigger-003/cdk-tipo-acao-workflow-trigger-003.module';

const routes: Routes = [
    {
        path: 'trigger',
        component: TipoAcaoWorkflowTrigger003Component,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflows/transicao-workflow/acao-transicao-workflow/acao-transicao-workflow-edit/tipo-acao-workflow-trigger/tipo-acao-workflow-trigger-003';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TipoAcaoWorkflowTrigger003Component
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
        CommonModule,
        TranslateModule,
        CdkSharedModule,
        AcaoTriggerStoreModule,
        CdkTipoAcaoWorkflowTrigger003Module
    ],
    providers: [
        fromGuards.ResolveGuard,
        TipoAcaoWorkflowService
    ]
})
export class TipoAcaoWorkflowTrigger003Module {
}
