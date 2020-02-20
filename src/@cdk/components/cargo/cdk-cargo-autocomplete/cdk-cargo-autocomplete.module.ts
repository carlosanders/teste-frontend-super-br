import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CargoService } from '@cdk/services/cargo.service';
import {CdkCargoAutocompleteComponent} from './cdk-cargo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCargoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        CargoService,
    ],
    exports: [
        CdkCargoAutocompleteComponent
    ]
})
export class CdkCargoAutocompleteModule {
}
