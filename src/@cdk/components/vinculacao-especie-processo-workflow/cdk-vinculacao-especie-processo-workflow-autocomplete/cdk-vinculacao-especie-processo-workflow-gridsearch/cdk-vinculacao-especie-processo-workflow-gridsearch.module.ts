import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {CdkVinculacaoEspecieProcessoWorkflowGridsearchComponent} from './cdk-vinculacao-especie-processo-workflow-gridsearch.component';
import {
    CdkVinculacaoEspecieProcessoWorkflowGridModule,
} from '@cdk/components/vinculacao-especie-processo-workflow/cdk-vinculacao-especie-processo-workflow-grid/cdk-vinculacao-especie-processo-workflow-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoEspecieProcessoWorkflowGridsearchComponent
    ],
    imports: [
        CdkVinculacaoEspecieProcessoWorkflowGridModule,
        CdkSharedModule,
    ],
    providers: [
        VinculacaoEspecieProcessoWorkflowService
    ],
    exports: [
        CdkVinculacaoEspecieProcessoWorkflowGridsearchComponent
    ]
})
export class CdkVinculacaoEspecieProcessoWorkflowGridsearchModule {
}
