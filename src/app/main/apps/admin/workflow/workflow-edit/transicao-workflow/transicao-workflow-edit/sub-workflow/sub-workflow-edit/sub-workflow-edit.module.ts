import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubWorkflowEditComponent} from './sub-workflow-edit.component';
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
import {VinculacaoTransicaoWorkflowStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {
    VinculacaoTransicaoWorkflowService
} from '@cdk/services/vinculacao-transicao-workflow.service';
import {
    CdkVinculacaoTransicaoWorkflowFormModule
} from '@cdk/components/vinculacao-transicao-workflow/cdk-vinculacao-transicao-workflow-form/cdk-vinculacao-transicao-workflow-form.module';

const routes: Routes = [
    {
        path: 'criar',
        component: SubWorkflowEditComponent,
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/sub-workflow/sub-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [SubWorkflowEditComponent],
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
        VinculacaoTransicaoWorkflowStoreModule,
        CdkVinculacaoTransicaoWorkflowFormModule,
        PathModule

    ],
    providers: [
        VinculacaoTransicaoWorkflowService,
    ]
})
export class SubWorkflowEditModule {
}
