import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransicaoWorkflowDadosBasicosComponent} from './transicao-workflow-dados-basicos.component';
import {RouterModule, Routes} from '@angular/router';
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
import {MatStepperModule} from '@angular/material/stepper';
import {TransicaoWorkflowDadosBasicosStoreModule} from './store/store.module';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {CdkTransicaoWorkflowFormModule} from '@cdk/components/transicao-workflow/cdk-transicao-workflow-form/cdk-transicao-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: TransicaoWorkflowDadosBasicosComponent,
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TransicaoWorkflowDadosBasicosComponent],
    imports: [
        CommonModule,
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
        MatStepperModule,
        TransicaoWorkflowDadosBasicosStoreModule,
        CdkTransicaoWorkflowFormModule,
        PathModule

    ],
    providers: [
        TransicaoWorkflowService,
    ]
})
export class TransicaoWorkflowDadosBasicosModule {
}
