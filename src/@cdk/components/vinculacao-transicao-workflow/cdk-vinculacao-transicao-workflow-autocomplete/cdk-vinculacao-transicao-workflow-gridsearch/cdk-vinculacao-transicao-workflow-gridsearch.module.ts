import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {CdkVinculacaoTransicaoWorkflowGridsearchComponent} from './cdk-vinculacao-transicao-workflow-gridsearch.component';
import {
    CdkVinculacaoTransicaoWorkflowGridModule,
} from '@cdk/components/vinculacao-transicao-workflow/cdk-vinculacao-transicao-workflow-grid/cdk-vinculacao-transicao-workflow-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoTransicaoWorkflowGridsearchComponent
    ],
    imports: [
        CdkVinculacaoTransicaoWorkflowGridModule,
        CdkSharedModule,
    ],
    providers: [
        VinculacaoTransicaoWorkflowService
    ],
    exports: [
        CdkVinculacaoTransicaoWorkflowGridsearchComponent
    ]
})
export class CdkVinculacaoTransicaoWorkflowGridsearchModule {
}
