import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieRelevanciaService } from '@cdk/services/especie-relevancia.service';
import {CdkEspecieRelevanciaAutocompleteComponent} from './cdk-especie-relevancia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieRelevanciaService,
    ],
    exports: [
        CdkEspecieRelevanciaAutocompleteComponent
    ]
})
export class CdkEspecieRelevanciaAutocompleteModule {
}
