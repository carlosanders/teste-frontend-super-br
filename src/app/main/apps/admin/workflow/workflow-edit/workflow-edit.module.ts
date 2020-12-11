import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowEditComponent} from './workflow-edit.component';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {CdkSidebarModule} from '../../../../../../@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {WorkflowEditStoreModule} from './store/store.module';
import {WorkflowService} from '../../../../../../@cdk/services/workflow.service';
import {CdkWorkflowFormModule} from '../../../../../../@cdk/components/workflow/cdk-workflow-form/cdk-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../../@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':workflowHandle',
        component: WorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [WorkflowEditComponent],
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
        WorkflowEditStoreModule,
        CdkWorkflowFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        WorkflowService,
    ]
})
export class WorkflowEditModule {
}
