import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeEtiquetaService } from '@cdk/services/modalidade-etiqueta.service';
import {CdkModalidadeEtiquetaAutocompleteComponent} from './cdk-modalidade-etiqueta-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeEtiquetaService,
    ],
    exports: [
        CdkModalidadeEtiquetaAutocompleteComponent
    ]
})
export class CdkModalidadeEtiquetaAutocompleteModule {
}
