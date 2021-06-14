import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
