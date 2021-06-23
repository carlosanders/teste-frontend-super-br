import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
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

        CdkSharedModule,
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
