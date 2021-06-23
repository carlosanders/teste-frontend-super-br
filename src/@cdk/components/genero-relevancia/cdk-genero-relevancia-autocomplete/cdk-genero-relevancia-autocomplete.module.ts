import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaAutocompleteComponent} from './cdk-genero-relevancia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
