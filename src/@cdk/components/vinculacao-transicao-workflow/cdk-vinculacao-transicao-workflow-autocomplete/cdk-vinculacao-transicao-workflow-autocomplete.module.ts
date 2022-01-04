import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoTransicaoWorkflowService} from '@cdk/services/vinculacao-transicao-workflow.service';
import {CdkVinculacaoTransicaoWorkflowAutocompleteComponent} from './cdk-vinculacao-transicao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoTransicaoWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoTransicaoWorkflowService,
    ],
    exports: [
        CdkVinculacaoTransicaoWorkflowAutocompleteComponent
    ]
})
export class CdkVinculacaoTransicaoWorkflowAutocompleteModule {
}
