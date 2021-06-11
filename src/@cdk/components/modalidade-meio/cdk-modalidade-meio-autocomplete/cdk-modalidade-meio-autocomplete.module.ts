import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {CdkModalidadeMeioAutocompleteComponent} from './cdk-modalidade-meio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeMeioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkModalidadeMeioAutocompleteComponent
    ]
})
export class CdkModalidadeMeioAutocompleteModule {
}
