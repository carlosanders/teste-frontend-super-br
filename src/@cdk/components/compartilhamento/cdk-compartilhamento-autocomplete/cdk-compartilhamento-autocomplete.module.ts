import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {CdkCompartilhamentoAutocompleteComponent} from './cdk-compartilhamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        CompartilhamentoService,
    ],
    exports: [
        CdkCompartilhamentoAutocompleteComponent
    ]
})
export class CdkCompartilhamentoAutocompleteModule {
}
