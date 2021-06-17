import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {CdkModalidadeGarantiaAutocompleteComponent} from './cdk-modalidade-garantia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeGarantiaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkModalidadeGarantiaAutocompleteComponent
    ]
})
export class CdkModalidadeGarantiaAutocompleteModule {
}
