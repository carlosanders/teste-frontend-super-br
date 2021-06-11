import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {CdkAcaoTransicaoWorkflowGridsearchComponent} from './cdk-acao-transicao-workflow-gridsearch.component';
import {CdkAcaoTransicaoWorkflowGridModule} from '@cdk/components/acao-transicao-workflow/cdk-acao-transicao-workflow-grid/cdk-acao-transicao-workflow-grid.module';

@NgModule({
    declarations: [
        CdkAcaoTransicaoWorkflowGridsearchComponent
    ],
    imports: [

        CdkAcaoTransicaoWorkflowGridModule,

        CdkSharedModule,
    ],
    providers: [
        AcaoTransicaoWorkflowService
    ],
    exports: [
        CdkAcaoTransicaoWorkflowGridsearchComponent
    ]
})
export class CdkAcaoTransicaoWorkflowGridsearchModule {
}
