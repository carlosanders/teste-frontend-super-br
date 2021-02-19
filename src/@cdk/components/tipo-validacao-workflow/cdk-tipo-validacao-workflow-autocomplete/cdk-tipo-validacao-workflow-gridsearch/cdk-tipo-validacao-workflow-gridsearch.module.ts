import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';

import { TipoValidacaoWorkflowService } from '@cdk/services/tipo-validacao-workflow.service';
import { CdkTipoValidacaoWorkflowGridModule } from '@cdk/components/tipo-validacao-workflow/cdk-tipo-validacao-workflow-grid/cdk-tipo-validacao-workflow-grid.module';

@NgModule({
    declarations: [
    ],
    imports: [

        CdkTipoValidacaoWorkflowGridModule,
        
        CdkSharedModule,
    ],
    providers: [
        TipoValidacaoWorkflowService
    ],
    exports: [
    ]
})
export class CdkTipoValidacaoWorkflowGridsearchModule {
}
