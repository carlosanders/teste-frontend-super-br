import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieDocumentoAvulsoService } from '@cdk/services/especie-documento-avulso.service';
import {CdkEspecieDocumentoAvulsoAutocompleteComponent} from './cdk-especie-documento-avulso-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService,
    ],
    exports: [
        CdkEspecieDocumentoAvulsoAutocompleteComponent
    ]
})
export class CdkEspecieDocumentoAvulsoAutocompleteModule {
}
