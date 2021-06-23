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
import {TipoValidacaoWorkflowFormTipoDocComponent} from './tipo-validacao-workflow-form-tipo-doc.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from '@angular/common';
import * as fromGuards from './store/guards';
import {ValidacaoFormStoreModule} from '../store/store.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {CdkTipoValidacaoTipoDocModule} from '@cdk/components/validacao-transicao-workflow/tipos-validacoes/tipo-validacao-tipo-doc/cdk-tipo-validacao-tipo-doc.module';

const routes: Routes = [
    {
        path: '',
        component: TipoValidacaoWorkflowFormTipoDocComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/validacao-transicao-workflow/validacao-transicao-workflow-edit/tipo-validacao-workflow-form/tipo-validacao-workflow-form-tipo-doc';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TipoValidacaoWorkflowFormTipoDocComponent
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
        CdkTipoValidacaoTipoDocModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        TipoValidacaoWorkflowService
    ]
})
export class TipoValidacaoWorkflowFormTipoDocModule {
}
