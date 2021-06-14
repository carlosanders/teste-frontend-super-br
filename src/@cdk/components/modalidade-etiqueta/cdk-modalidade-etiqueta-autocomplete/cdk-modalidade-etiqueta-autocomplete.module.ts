import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
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

        CdkSharedModule,
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
