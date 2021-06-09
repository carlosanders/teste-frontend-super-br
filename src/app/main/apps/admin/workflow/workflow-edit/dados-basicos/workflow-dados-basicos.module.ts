import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowDadosBasicosComponent} from './workflow-dados-basicos.component';
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
import {WorkflowDadosBasicosStoreModule} from './store/store.module';
import {WorkflowService} from '@cdk/services/workflow.service';
import {CdkWorkflowFormModule} from '@cdk/components/workflow/cdk-workflow-form/cdk-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: WorkflowDadosBasicosComponent
    }
];

const path = 'app/main/apps/admin/workflow/workflow-dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [WorkflowDadosBasicosComponent],
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
        WorkflowDadosBasicosStoreModule,
        CdkWorkflowFormModule,
        PathModule
    ],
    providers: [
        WorkflowService,
    ]
})
export class WorkflowDadosBasicosModule {
}
