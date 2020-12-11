import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransicaoWorkflowEditComponent} from './transicao-workflow-edit.component';
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
} from '../../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';
import {CdkSidebarModule} from '../../../../../../../@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {TransicaoWorkflowEditStoreModule} from './store/store.module';
import {TransicaoWorkflowService} from '../../../../../../../@cdk/services/transicao-workflow.service';
import {CdkTransicaoWorkflowFormModule} from '../../../../../../../@cdk/components/transicao-workflow/cdk-transicao-workflow-form/cdk-transicao-workflow-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '../../../../../../../@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':transicaoWorkflowHandle',
        component: TransicaoWorkflowEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/transicao-workflow/transicao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TransicaoWorkflowEditComponent],
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
        TransicaoWorkflowEditStoreModule,
        CdkTransicaoWorkflowFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        TransicaoWorkflowService,
    ]
})
export class TransicaoWorkflowEditModule {
}
