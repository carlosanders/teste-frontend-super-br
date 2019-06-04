import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EtiquetaService } from '@cdk/services/etiqueta.service';
import {CdkEtiquetaAutocompleteComponent} from './cdk-etiqueta-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEtiquetaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EtiquetaService,
    ],
    exports: [
        CdkEtiquetaAutocompleteComponent
    ]
})
export class CdkEtiquetaAutocompleteModule {
}
