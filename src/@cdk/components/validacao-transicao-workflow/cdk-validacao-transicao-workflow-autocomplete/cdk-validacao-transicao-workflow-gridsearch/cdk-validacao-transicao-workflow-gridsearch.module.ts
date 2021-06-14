import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {CdkValidacaoTransicaoWorkflowGridsearchComponent} from './cdk-validacao-transicao-workflow-gridsearch.component';
import {CdkValidacaoTransicaoWorkflowGridModule} from '@cdk/components/validacao-transicao-workflow/cdk-validacao-transicao-workflow-grid/cdk-validacao-transicao-workflow-grid.module';

@NgModule({
    declarations: [
        CdkValidacaoTransicaoWorkflowGridsearchComponent
    ],
    imports: [

        CdkValidacaoTransicaoWorkflowGridModule,

        CdkSharedModule,
    ],
    providers: [
        ValidacaoTransicaoWorkflowService
    ],
    exports: [
        CdkValidacaoTransicaoWorkflowGridsearchComponent
    ]
})
export class CdkValidacaoTransicaoWorkflowGridsearchModule {
}
