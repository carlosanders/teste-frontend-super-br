import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {CdkDocumentoIdentificadorAutocompleteComponent} from './cdk-documento-identificador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        DocumentoIdentificadorService,
    ],
    exports: [
        CdkDocumentoIdentificadorAutocompleteComponent
    ]
})
export class CdkDocumentoIdentificadorAutocompleteModule {
}
