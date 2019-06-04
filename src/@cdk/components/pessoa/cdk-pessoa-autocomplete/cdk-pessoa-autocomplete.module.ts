import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {CdkPessoaAutocompleteComponent} from './cdk-pessoa-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkPessoaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        CdkPessoaAutocompleteComponent
    ]
})
export class CdkPessoaAutocompleteModule {
}
