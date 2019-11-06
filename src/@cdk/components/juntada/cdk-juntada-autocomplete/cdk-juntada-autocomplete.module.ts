import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaAutocompleteComponent} from './cdk-juntada-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkJuntadaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        JuntadaService,
    ],
    exports: [
        CdkJuntadaAutocompleteComponent
    ]
})
export class CdkJuntadaAutocompleteModule {
}
