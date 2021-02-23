import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {CdkAcompanhamentoAutocompleteComponent} from './cdk-acompanhamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAcompanhamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AcompanhamentoService,
    ],
    exports: [
        CdkAcompanhamentoAutocompleteComponent
    ]
})
export class CdkAcompanhamentoAutocompleteModule {
}
