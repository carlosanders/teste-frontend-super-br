import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
