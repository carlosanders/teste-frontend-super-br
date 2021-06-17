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
import {TipoValidacaoWorkflowFormSetorOrgComponent} from './tipo-validacao-workflow-form-setor-org.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from '@angular/common';
import * as fromGuards from './store/guards';
import {ValidacaoFormStoreModule} from '../store/store.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {CdkTipoValidacaoSetorOrgModule} from '@cdk/components/validacao-transicao-workflow/tipos-validacoes/tipo-validacao-setor-org/cdk-tipo-validacao-setor-org.module';

const routes: Routes = [
    {
        path: '',
        component: TipoValidacaoWorkflowFormSetorOrgComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/validacao-transicao-workflow/validacao-transicao-workflow-edit/tipo-validacao-workflow-form/tipo-validacao-workflow-form-setor-org';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TipoValidacaoWorkflowFormSetorOrgComponent
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
        ValidacaoFormStoreModule,
        CdkTipoValidacaoSetorOrgModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        TipoValidacaoWorkflowService
    ]
})
export class TipoValidacaoWorkflowFormSetorOrgModule {
}
