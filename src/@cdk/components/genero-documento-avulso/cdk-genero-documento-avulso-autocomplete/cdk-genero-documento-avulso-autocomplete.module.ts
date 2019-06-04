import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoAutocompleteComponent} from './cdk-genero-documento-avulso-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroDocumentoAvulsoService,
    ],
    exports: [
        CdkGeneroDocumentoAvulsoAutocompleteComponent
    ]
})
export class CdkGeneroDocumentoAvulsoAutocompleteModule {
}
