import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {PaisService} from '@cdk/services/pais.service';
import {CdkPaisAutocompleteComponent} from './cdk-pais-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkPaisAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        PaisService,
    ],
    exports: [
        CdkPaisAutocompleteComponent
    ]
})
export class CdkPaisAutocompleteModule {
}
