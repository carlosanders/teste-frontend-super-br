import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoAutocompleteComponent} from './cdk-historico-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkHistoricoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        HistoricoService,
    ],
    exports: [
        CdkHistoricoAutocompleteComponent
    ]
})
export class CdkHistoricoAutocompleteModule {
}
