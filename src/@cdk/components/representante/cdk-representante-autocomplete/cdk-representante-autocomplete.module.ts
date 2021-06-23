import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteAutocompleteComponent} from './cdk-representante-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRepresentanteAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        RepresentanteService,
    ],
    exports: [
        CdkRepresentanteAutocompleteComponent
    ]
})
export class CdkRepresentanteAutocompleteModule {
}
