import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EnderecoService } from '@cdk/services/endereco.service';
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

        FuseSharedModule,
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
