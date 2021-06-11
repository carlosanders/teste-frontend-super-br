import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
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

        CdkSharedModule,
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
