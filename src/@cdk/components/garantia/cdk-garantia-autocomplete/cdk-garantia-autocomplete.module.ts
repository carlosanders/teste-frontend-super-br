import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GarantiaService} from '@cdk/services/garantia.service';
import {CdkGarantiaAutocompleteComponent} from './cdk-garantia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGarantiaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GarantiaService,
    ],
    exports: [
        CdkGarantiaAutocompleteComponent
    ]
})
export class CdkGarantiaAutocompleteModule {
}
