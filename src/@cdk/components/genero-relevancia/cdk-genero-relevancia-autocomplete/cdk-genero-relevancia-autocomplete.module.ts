import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaAutocompleteComponent} from './cdk-genero-relevancia-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroRelevanciaService,
    ],
    exports: [
        CdkGeneroRelevanciaAutocompleteComponent
    ]
})
export class CdkGeneroRelevanciaAutocompleteModule {
}
