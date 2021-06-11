import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSortModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {WorkflowViewComponent} from './workflow-view.component';
import {WorkflowService} from '@cdk/services/workflow.service';
import {RouterModule, Routes} from '@angular/router';
import {WorkflowViewStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: WorkflowViewComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/workflow-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        WorkflowViewComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        WorkflowViewStoreModule,
        MatTooltipModule
    ],
    providers: [
        WorkflowService,
        fromGuards.ResolveGuard
    ],
    exports: [
        WorkflowViewComponent
    ]
})
export class WorkflowViewModule {
}
