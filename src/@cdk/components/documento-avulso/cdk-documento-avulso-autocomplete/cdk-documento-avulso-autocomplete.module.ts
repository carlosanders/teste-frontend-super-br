import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoAutocompleteComponent} from './cdk-documento-avulso-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        DocumentoAvulsoService,
    ],
    exports: [
        CdkDocumentoAvulsoAutocompleteComponent
    ]
})
export class CdkDocumentoAvulsoAutocompleteModule {
}
