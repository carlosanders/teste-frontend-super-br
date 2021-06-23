import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoAutocompleteComponent} from './cdk-modalidade-vinculacao-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService,
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoAutocompleteComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoAutocompleteModule {
}
