import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoAutocompleteComponent} from './cdk-vinculacao-documento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoDocumentoService,
    ],
    exports: [
        CdkVinculacaoDocumentoAutocompleteComponent
    ]
})
export class CdkVinculacaoDocumentoAutocompleteModule {
}
