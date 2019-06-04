import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {CdkVinculacaoEtiquetaAutocompleteComponent} from './cdk-vinculacao-etiqueta-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoEtiquetaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoEtiquetaService,
    ],
    exports: [
        CdkVinculacaoEtiquetaAutocompleteComponent
    ]
})
export class CdkVinculacaoEtiquetaAutocompleteModule {
}
