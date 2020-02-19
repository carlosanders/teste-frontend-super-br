import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {CdkVinculacaoProcessoAutocompleteComponent} from './cdk-vinculacao-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoProcessoService,
    ],
    exports: [
        CdkVinculacaoProcessoAutocompleteComponent
    ]
})
export class CdkVinculacaoProcessoAutocompleteModule {
}
