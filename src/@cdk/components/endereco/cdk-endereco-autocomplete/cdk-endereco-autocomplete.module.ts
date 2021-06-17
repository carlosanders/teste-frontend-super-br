import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EnderecoService} from '@cdk/services/endereco.service';
import {CdkEnderecoAutocompleteComponent} from './cdk-endereco-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEnderecoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        EnderecoService,
    ],
    exports: [
        CdkEnderecoAutocompleteComponent
    ]
})
export class CdkEnderecoAutocompleteModule {
}
