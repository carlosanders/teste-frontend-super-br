import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoAutocompleteComponent} from './cdk-genero-documento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroDocumentoService,
    ],
    exports: [
        CdkGeneroDocumentoAutocompleteComponent
    ]
})
export class CdkGeneroDocumentoAutocompleteModule {
}
