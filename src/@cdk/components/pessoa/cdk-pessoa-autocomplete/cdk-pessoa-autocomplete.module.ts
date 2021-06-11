import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {CdkPessoaAutocompleteComponent} from './cdk-pessoa-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkPessoaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
