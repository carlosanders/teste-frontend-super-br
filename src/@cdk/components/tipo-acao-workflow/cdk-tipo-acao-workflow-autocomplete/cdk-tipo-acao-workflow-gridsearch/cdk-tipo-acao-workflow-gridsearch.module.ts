import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';

import { TipoAcaoWorkflowService } from '@cdk/services/tipo-acao-workflow.service';
import { CdkTipoAcaoWorkflowGridModule } from '@cdk/components/tipo-acao-workflow/cdk-tipo-acao-workflow-grid/cdk-tipo-acao-workflow-grid.module';

@NgModule({
    declarations: [
    ],
    imports: [

        CdkTipoAcaoWorkflowGridModule,
        
        CdkSharedModule,
    ],
    providers: [
        TipoAcaoWorkflowService
    ],
    exports: [
    ]
})
export class CdkTipoAcaoWorkflowGridsearchModule {
}
