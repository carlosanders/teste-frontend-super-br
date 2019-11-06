import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoAutocompleteComponent} from './cdk-feriado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkFeriadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoAutocompleteComponent
    ]
})
export class CdkFeriadoAutocompleteModule {
}
