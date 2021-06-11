import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';
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

        CdkSharedModule,
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
