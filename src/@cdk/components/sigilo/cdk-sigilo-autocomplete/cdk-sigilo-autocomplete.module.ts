import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloAutocompleteComponent} from './cdk-sigilo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkSigiloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloAutocompleteComponent
    ]
})
export class CdkSigiloAutocompleteModule {
}
