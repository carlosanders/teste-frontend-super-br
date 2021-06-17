import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeFaseService} from '@cdk/services/modalidade-fase.service';
import {CdkModalidadeFaseAutocompleteComponent} from './cdk-modalidade-fase-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeFaseAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseAutocompleteComponent
    ]
})
export class CdkModalidadeFaseAutocompleteModule {
}
