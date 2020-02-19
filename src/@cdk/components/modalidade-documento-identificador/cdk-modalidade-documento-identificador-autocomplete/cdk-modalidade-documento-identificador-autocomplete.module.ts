import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDocumentoIdentificadorService } from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorAutocompleteComponent} from './cdk-modalidade-documento-identificador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService,
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorAutocompleteComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorAutocompleteModule {
}
