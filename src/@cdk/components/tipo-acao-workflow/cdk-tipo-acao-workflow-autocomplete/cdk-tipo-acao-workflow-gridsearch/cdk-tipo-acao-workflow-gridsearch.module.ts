import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {CdkTipoAcaoWorkflowGridModule} from '@cdk/components/tipo-acao-workflow/cdk-tipo-acao-workflow-grid/cdk-tipo-acao-workflow-grid.module';
import {CdkTipoAcaoWorkflowGridsearchComponent} from './cdk-tipo-acao-workflow-gridsearch.component';

@NgModule({
    declarations: [
        CdkTipoAcaoWorkflowGridsearchComponent
    ],
    imports: [

        CdkTipoAcaoWorkflowGridModule,

        CdkSharedModule,
    ],
    providers: [
        TipoAcaoWorkflowService
    ],
    exports: [
        CdkTipoAcaoWorkflowGridsearchComponent
    ]
})
export class CdkTipoAcaoWorkflowGridsearchModule {
}
