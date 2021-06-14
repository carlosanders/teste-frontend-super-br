import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoValidacaoWorkflowService} from '@cdk/services/tipo-validacao-workflow.service';
import {CdkTipoValidacaoWorkflowAutocompleteComponent} from './cdk-tipo-validacao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoValidacaoWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TipoValidacaoWorkflowService,
    ],
    exports: [
        CdkTipoValidacaoWorkflowAutocompleteComponent
    ]
})
export class CdkTipoValidacaoWorkflowAutocompleteModule {
}
