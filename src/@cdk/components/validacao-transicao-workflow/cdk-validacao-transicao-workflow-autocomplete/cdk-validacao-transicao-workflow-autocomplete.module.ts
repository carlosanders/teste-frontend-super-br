import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';
import {CdkValidacaoTransicaoWorkflowAutocompleteComponent} from './cdk-validacao-transicao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkValidacaoTransicaoWorkflowAutocompleteComponent,
    ],
    imports: [
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ValidacaoTransicaoWorkflowService,
    ],
    exports: [
        CdkValidacaoTransicaoWorkflowAutocompleteComponent
    ]
})
export class CdkValidacaoTransicaoWorkflowAutocompleteModule {
}
