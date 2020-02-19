import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MunicipioService } from '@cdk/services/municipio.service';
import {CdkMunicipioAutocompleteComponent} from './cdk-municipio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkMunicipioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkMunicipioAutocompleteComponent
    ]
})
export class CdkMunicipioAutocompleteModule {
}
