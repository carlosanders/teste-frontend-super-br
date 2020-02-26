import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeGeneroPessoaService } from '@cdk/services/modalidade-genero-pessoa.service';
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

        FuseSharedModule,
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
