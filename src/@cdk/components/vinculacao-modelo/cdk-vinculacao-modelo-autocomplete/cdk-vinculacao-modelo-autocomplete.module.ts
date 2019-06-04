import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {CdkVinculacaoModeloAutocompleteComponent} from './cdk-vinculacao-modelo-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoModeloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoModeloService,
    ],
    exports: [
        CdkVinculacaoModeloAutocompleteComponent
    ]
})
export class CdkVinculacaoModeloAutocompleteModule {
}
