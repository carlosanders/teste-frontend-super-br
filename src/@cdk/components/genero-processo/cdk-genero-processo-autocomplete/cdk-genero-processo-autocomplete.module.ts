import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroProcessoService} from '@cdk/services/genero-processo.service';
import {CdkGeneroProcessoAutocompleteComponent} from './cdk-genero-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroProcessoService,
    ],
    exports: [
        CdkGeneroProcessoAutocompleteComponent
    ]
})
export class CdkGeneroProcessoAutocompleteModule {
}
