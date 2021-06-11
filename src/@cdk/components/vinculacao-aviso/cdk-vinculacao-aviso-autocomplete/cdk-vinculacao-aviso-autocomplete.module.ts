import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoAvisoService} from '@cdk/services/vinculacao-aviso.service';
import {CdkVinculacaoAvisoAutocompleteComponent} from './cdk-vinculacao-aviso-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoAvisoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,
        CdkSharedModule,
    ],
    providers: [
        VinculacaoAvisoService,
    ],
    exports: [
        CdkVinculacaoAvisoAutocompleteComponent
    ]
})
export class CdkVinculacaoAvisoAutocompleteModule {
}
