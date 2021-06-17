import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeRepresentanteService} from '@cdk/services/modalidade-representante.service';
import {CdkModalidadeRepresentanteAutocompleteComponent} from './cdk-modalidade-representante-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeRepresentanteAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeRepresentanteService,
    ],
    exports: [
        CdkModalidadeRepresentanteAutocompleteComponent
    ]
})
export class CdkModalidadeRepresentanteAutocompleteModule {
}
