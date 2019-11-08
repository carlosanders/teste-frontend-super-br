import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeQualificacaoPessoaService } from '@cdk/services/modalidade-qualificacao-pessoa.service';
import {CdkModalidadeQualificacaoPessoaAutocompleteComponent} from './cdk-modalidade-qualificacao-pessoa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeQualificacaoPessoaService,
    ],
    exports: [
        CdkModalidadeQualificacaoPessoaAutocompleteComponent
    ]
})
export class CdkModalidadeQualificacaoPessoaAutocompleteModule {
}
