import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoAcaoWorkflowService} from '@cdk/services/tipo-acao-workflow.service';
import {CdkTipoAcaoWorkflowAutocompleteComponent} from './cdk-tipo-acao-workflow-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoAcaoWorkflowAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TipoAcaoWorkflowService,
    ],
    exports: [
        CdkTipoAcaoWorkflowAutocompleteComponent
    ]
})
export class CdkTipoAcaoWorkflowAutocompleteModule {
}
