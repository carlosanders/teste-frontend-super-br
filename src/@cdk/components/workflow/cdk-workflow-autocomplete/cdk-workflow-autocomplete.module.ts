import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {WorkflowService} from '@cdk/services/workflow.service';
import {CdkWorkflowAutocompleteComponent} from './cdk-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        WorkflowService,
    ],
    exports: [
        CdkWorkflowAutocompleteComponent
    ]
})
export class CdkWorkflowAutocompleteModule {
}
