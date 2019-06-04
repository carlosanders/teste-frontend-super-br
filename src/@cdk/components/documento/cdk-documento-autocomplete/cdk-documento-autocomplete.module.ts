import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoAutocompleteComponent} from './cdk-documento-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDocumentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        DocumentoService,
    ],
    exports: [
        CdkDocumentoAutocompleteComponent
    ]
})
export class CdkDocumentoAutocompleteModule {
}
