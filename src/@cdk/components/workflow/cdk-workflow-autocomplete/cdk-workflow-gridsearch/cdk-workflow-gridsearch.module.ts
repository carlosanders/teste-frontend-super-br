import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {WorkflowService} from '@cdk/services/workflow.service';
import {CdkWorkflowGridsearchComponent} from './cdk-workflow-gridsearch.component';
import {CdkWorkflowGridModule} from '@cdk/components/workflow/cdk-workflow-grid/cdk-workflow-grid.module';

@NgModule({
    declarations: [
        CdkWorkflowGridsearchComponent
    ],
    imports: [

        CdkWorkflowGridModule,

        CdkSharedModule,
    ],
    providers: [
        WorkflowService
    ],
    exports: [
        CdkWorkflowGridsearchComponent
    ]
})
export class CdkWorkflowGridsearchModule {
}
