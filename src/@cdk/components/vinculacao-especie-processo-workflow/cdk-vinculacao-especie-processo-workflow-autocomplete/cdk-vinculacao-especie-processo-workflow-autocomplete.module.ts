import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoEspecieProcessoWorkflowService} from '@cdk/services/vinculacao-especie-processo-workflow.service';
import {CdkVinculacaoEspecieProcessoWorkflowAutocompleteComponent} from './cdk-vinculacao-especie-processo-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoEspecieProcessoWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoEspecieProcessoWorkflowService,
    ],
    exports: [
        CdkVinculacaoEspecieProcessoWorkflowAutocompleteComponent
    ]
})
export class CdkVinculacaoEspecieProcessoWorkflowAutocompleteModule {
}
