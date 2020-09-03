import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TransicaoWorkflowService} from '@cdk/services/transicao-workflow.service';
import {CdkTransicaoWorkflowAutocompleteComponent} from './cdk-transicao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTransicaoWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TransicaoWorkflowService,
    ],
    exports: [
        CdkTransicaoWorkflowAutocompleteComponent
    ]
})
export class CdkTransicaoWorkflowAutocompleteModule {
}
