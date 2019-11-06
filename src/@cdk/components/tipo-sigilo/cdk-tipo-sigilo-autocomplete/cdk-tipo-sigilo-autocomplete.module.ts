import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloAutocompleteComponent} from './cdk-tipo-sigilo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoSigiloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        TipoSigiloService,
    ],
    exports: [
        CdkTipoSigiloAutocompleteComponent
    ]
})
export class CdkTipoSigiloAutocompleteModule {
}
