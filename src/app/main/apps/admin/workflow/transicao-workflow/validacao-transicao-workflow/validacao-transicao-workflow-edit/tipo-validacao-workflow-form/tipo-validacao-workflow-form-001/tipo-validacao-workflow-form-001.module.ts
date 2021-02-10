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
import {TipoValidacaoWorkflowForm001Component} from './tipo-validacao-workflow-form-001.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {CommonModule} from "@angular/common";
import * as fromGuards from "./store/guards";
//Ver o que e
import {ValidacaoFormStoreModule} from "../store/store.module";
import {TipoValidacaoWorkflowService} from "@cdk/services/tipo-validacao-workflow.service";
import {CdkValidacaoTransicaoWorkflowFormModule} from "@cdk/components/validacao-transicao-workflow/cdk-validacao-transicao-workflow-form/cdk-validacao-transicao-workflow-form.module";

const routes: Routes = [
    {
        path: 'form',
        component: TipoValidacaoWorkflowForm001Component,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflows/transicao-workflow/validacao-transicao-workflow/validacao-transicao-workflow-edit/tipo-validacao-workflow-form/tipo-validacao-workflow-form-001';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TipoValidacaoWorkflowForm001Component
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
      CdkValidacaoTransicaoWorkflowFormModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        TipoValidacaoWorkflowService
    ]
})
export class TipoValidacaoWorkflowForm001Module {
}
