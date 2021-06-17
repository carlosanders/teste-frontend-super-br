import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
