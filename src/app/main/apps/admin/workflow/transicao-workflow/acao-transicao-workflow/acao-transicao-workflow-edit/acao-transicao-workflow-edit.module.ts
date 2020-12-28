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
import {CdkAcaoTransicaoWorkflowFormModule} from '@cdk/components/acao-transicao-workflow/cdk-acao-transicao-workflow-form/cdk-acao-transicao-workflow-form.module';
import {AcaoTransicaoWorkflowEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':acaoTransicaoWorkflowHandle',
        component: AcaoTransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard]
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

        CdkAcaoTransicaoWorkflowFormModule,
        AcaoTransicaoWorkflowEditStoreModule,
    ],
    providers: [
        AcaoTransicaoWorkflowService,
        fromGuards.ResolveGuard
    ]
})
export class AcaoTransicaoWorkflowEditModule {
}
