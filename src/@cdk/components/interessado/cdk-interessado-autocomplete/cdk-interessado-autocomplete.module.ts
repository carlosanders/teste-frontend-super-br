import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {InteressadoService} from '@cdk/services/interessado.service';
import {CdkInteressadoAutocompleteComponent} from './cdk-interessado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkInteressadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        InteressadoService,
    ],
    exports: [
        CdkInteressadoAutocompleteComponent
    ]
})
export class CdkInteressadoAutocompleteModule {
}
