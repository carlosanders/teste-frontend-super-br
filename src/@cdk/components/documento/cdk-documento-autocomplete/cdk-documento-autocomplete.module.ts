import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoAutocompleteComponent} from './cdk-documento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDocumentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
