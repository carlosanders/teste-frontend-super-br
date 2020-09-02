import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {CdkTransicaoWorkflowGridsearchComponent} from './cdk-transicao-workflow-gridsearch.component';
import {CdkTransicaoWorkflowGridModule} from '@cdk/components/transicao-workflow/cdk-transicao-workflow-grid/cdk-transicao-workflow-grid.module';

@NgModule({
    declarations: [
        CdkTransicaoWorkflowGridsearchComponent
    ],
    imports: [

        CdkTransicaoWorkflowGridModule,

        CdkSharedModule,
    ],
    providers: [
        TransicaoWorkflowService
    ],
    exports: [
        CdkTransicaoWorkflowGridsearchComponent
    ]
})
export class CdkTransicaoWorkflowGridsearchModule {
}
