import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGeneroPessoaService} from '@cdk/services/modalidade-genero-pessoa.service';
import {CdkModalidadeGeneroPessoaAutocompleteComponent} from './cdk-modalidade-genero-pessoa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeGeneroPessoaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeGeneroPessoaService,
    ],
    exports: [
        CdkModalidadeGeneroPessoaAutocompleteComponent
    ]
})
export class CdkModalidadeGeneroPessoaAutocompleteModule {
}
