import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
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

        FuseSharedModule,
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
