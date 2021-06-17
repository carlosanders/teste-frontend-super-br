import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {CdkAcaoTransicaoWorkflowAutocompleteComponent} from './cdk-acao-transicao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAcaoTransicaoWorkflowAutocompleteComponent,
    ],
    imports: [
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AcaoTransicaoWorkflowService,
    ],
    exports: [
        CdkAcaoTransicaoWorkflowAutocompleteComponent
    ]
})
export class CdkAcaoTransicaoWorkflowAutocompleteModule {
}
