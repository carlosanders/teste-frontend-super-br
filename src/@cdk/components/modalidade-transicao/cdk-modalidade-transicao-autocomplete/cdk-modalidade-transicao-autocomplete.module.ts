import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTransicaoService } from '@cdk/services/modalidade-transicao.service';
import {CdkModalidadeTransicaoAutocompleteComponent} from './cdk-modalidade-transicao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeTransicaoService,
    ],
    exports: [
        CdkModalidadeTransicaoAutocompleteComponent
    ]
})
export class CdkModalidadeTransicaoAutocompleteModule {
}
