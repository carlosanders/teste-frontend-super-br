import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeVinculacaoProcessoService } from '@cdk/services/modalidade-vinculacao-processo.service';
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

        FuseSharedModule,
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
